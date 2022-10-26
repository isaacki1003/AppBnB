const express = require('express');

const { Spot, SpotImage, Review, ReviewImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {

    const reviews = await Review.findAll({
        where: {
          userId: req.user.id
        },
        include: [
          {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
          },
          {
            model: Spot,
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'description']
            },
            include: {
              model: SpotImage,
              where: { preview: true },
              attributes: ['url']
            }
          },
          {
            model: ReviewImage,
            attributes: ['id', 'url']
          }
        ]
    });

    for (let i = 0; i < reviews.length; i++) {
        let review = reviews[i].toJSON();

        let imageURL = review.Spot.SpotImages[0];

        if (!imageURL) {
          review.Spot.previewImage = 'None available!'
        } else {
          review.Spot.previewImage = imageURL.url
        }

        delete review.Spot.SpotImages;

        reviews[i] = review;
      };

      return res.json({ Reviews: reviews });
});

//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId);

    if (!review) {
        return res
            .status(404)
            .json({
            message: "Review couldn't be found",
            statusCode: res.statusCode
            });
    };

    const { url } = req.body;

    const reviewImages = await ReviewImage.findAll({
        where: {
          reviewId: review.id
        }
    });

    if (reviewImages.length >= 10) {
        return res
         .status(403)
         .json({
            "message": "Maximum number of images for this resource was reached",
             "statusCode": res.statusCode
      })
    }

    const image = await ReviewImage.create({
        reviewId: review.id,
        url
    });

    return res.json({
        id: image.id,
        url
    });
});

//Edit a Review
router.put('/:reviewId', requireAuth, async (req, res) => {

    const findReview = await Review.findByPk(req.params.reviewId);
    const { review, stars } = req.body;

    if (!findReview) {
      return res
        .status(404)
        .json({
          message: "Review couldn't be found",
          statusCode: res.statusCode
        });
    };

    if (!review || !stars) {
      return res
        .status(400)
        .json({
          message: 'Validation Error',
          statusCode: res.statusCode,
          errors: [{
            review: 'Review text is required',
            stars: 'Stars must be an integer from 1 to 5'
          }]
        });
    };

    findReview.review = review;
    findReview.stars = stars;
    findReview.save();

    return res.json(findReview);
  });


//Delete A Review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.spotId);

    if (!review) {
        return res
         .status(404)
         .json({
            "message": "Review couldn't be found",
            "statusCode": 404
          });
    };

await review.destroy();

  return res
    .status(200)
    .json({
      message: 'Successfully deleted',
      statusCode: res.statusCode
    });

});

module.exports = router;
