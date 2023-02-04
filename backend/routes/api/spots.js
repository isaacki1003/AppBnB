const express = require('express');

const { validateSpot, validateReview, handleValidationErrors, validateBooking } = require('../../utils/validation');
const { validationResult } = require('express-validator');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Booking, Review, ReviewImage, Spot, SpotImage, User, sequelize } = require('../../db/models');

const { Op } = require('sequelize');

const router = express.Router();

const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');

//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
      return res
        .status(404)
        .json({
          message: "Spot couldn't be found",
          statusCode: res.statusCode
        });
    };

    const bookings1 = await Booking.findAll({
      where: {
        spotId: spot.id
      },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    });

    const bookings2 = await Booking.findAll({
      where: {
        spotId: spot.id
      },
      attributes: ['spotId', 'startDate', 'endDate', 'createdAt', 'updatedAt']
    });

    if (req.user.id === spot.ownerId) {
      return res.json ({ Bookings: bookings1 })
    } else {
      return res.json ({ Bookings: bookings2 })
    };
});

//Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
      return res
        .status(404)
        .json({
          message: "Spot couldn't be found",
          statusCode: res.statusCode
        });
    };

    const reviews = await Review.findAll({
        where: {
          spotId: spot.id
        },
        include: [
          {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
          },
          {
            model: ReviewImage,
            attributes: ['id', 'url']
          }
        ]
      });

      return res.json({ Reviews: reviews });

});

//Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
  const ownerId = req.user.id;

	// query all spot owned by current user
	let findSpots = await Spot.findAll({ where: { ownerId } });
  console.log(findSpots);


	let Spots = [];
	// formulating response
	for (let i = 0; i < findSpots.length; i++) {
		let spot = findSpots[i].toJSON();
		// GET AVG Rating for each Spot
		let rating = await Review.findAll({
			where: {
				spotId: Number(spot.id)
			},
			attributes: [
				[sequelize.fn('AVG', sequelize.col('Review.stars')), 'avgRating']
			],
			raw: true
		});
		// format avgRating to 1 decimal places
		const check = Number(rating[0].avgRating).toFixed(1);
		spot.avgRating = parseFloat(check);

		//GET PREVIEW IMAGE
		let previewImage = await SpotImage.findOne({
			where: {
				[Op.and]: [{ spotId: spot.id }, { preview: true }]
			}
		});
		spot.previewImage = previewImage
			? previewImage.url
			: 'No preview for this spot!';
		Spots.push(spot);
	}

	return res.json({ Spots });
});

//Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
          {
            model: User, as: 'Owner',
            attributes: ['id', 'firstName', 'lastName']
          },
          {
            model: SpotImage,
            attributes: ['id', 'url', 'preview']
          }
        ]
      });

    if (!spot) {
    return res
        .status(404)
        .json({
            message: "Spot couldn't be found",
            statusCode: res.statusCode
        })
    };

    const reviewCount = await Review.count({ where: { spotId: spot.id } });

    const starTotal = await Review.sum('stars', {
    where: { spotId: spot.id }
    });

    const spotJSON = spot.toJSON();

    if (!starTotal) {
    spotJSON.avgStarRating = 0
    } else {
    spotJSON.avgStarRating = (starTotal / reviewCount).toFixed(1);
    spotJSON.numReviews = reviewCount;
    }

    return res.json(spotJSON)
});

// Get all Spots
router.get('/', async (req, res) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    page = parseInt(page);
    size = parseInt(size);

    if (!page) page = 1;

    if (!size || size > 20) size = 20;


    if (page < 0 || size < 0 || minPrice < 0 || maxPrice < 0) {
        return res
        .status(400)
        .json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                "page": "Page must be greater than or equal to 1",
                "size": "Size must be greater than or equal to 1",
                "maxLat": "Maximum latitude is invalid",
                "minLat": "Minimum latitude is invalid",
                "minLng": "Maximum longitude is invalid",
                "maxLng": "Minimum longitude is invalid",
                "minPrice": "Maximum price must be greater than or equal to 0",
                "maxPrice": "Minimum price must be greater than or equal to 0"
            }
        });
    };


    let pagination = {};


    pagination.limit = size;
    pagination.offset = size * (page - 1)

    const allSpots = await Spot.findAll({
        ...pagination
    });

    const spotsArray = [];

    for (let i = 0; i < allSpots.length; i++) {
        let current = allSpots[i].toJSON();

        const reviewSum = await Review.sum('stars', {
        where: { spotId: current.id }
        })

        const reviewCount = await Review.count({
        where: { spotId: current.id }
        });

        if (!reviewSum) {
        current.avgRating = 0;
        } else {
        current.avgRating = (reviewSum / reviewCount).toFixed(1)
        };

        const prevImage = await SpotImage.findOne({
        where: {
            preview: true,
            spotId: current.id
        }
        });

        if (!prevImage) {
        current.previewImage = 'None available'
        } else {
        current.previewImage = prevImage.url
        };

        spotsArray.push(current);
    };

    return res.json({ Spots: spotsArray, page, size });
});

//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
      return `${msg}`;
    };
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
      return res.json({
        message: "Validation Error",
        statusCode: 400,
        errors: result.mapped()
      });
    }

    if (!spot) {
        return res
            .status(404)
            .json({
            message: "Spot couldn't be found",
            statusCode: res.statusCode
            });
    };

    const { review, stars } = req.body;

    // if (!review || !stars ) {
    //     return res
    //       .status(404)
    //       .json({
    //         message: 'Validation Error',
    //         statusCode: res.statusCode,
    //         errors: [{
    //           review: 'Review text is required',
    //           stars: 'Stars must be an integer from 1 to 5'
    //         }]
    //       })
    // };

      const exists = await Review.findOne({
        where: {
          userId: req.user.id,
          spotId: req.params.spotId
        }
      });

      if (exists) {
        return res
          .status(403)
          .json({
            message: 'User already has a review for this spot',
            statusCode: res.statusCode
          })
      };

    const review1 = await Review.create({
        userId: req.user.id,
        spotId: spot.id,
        review,
        stars
    });

    res.json(review1);
});

//Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, validateBooking, async (req, res) =>{
    const findSpot = await Spot.findByPk(req.params.spotId);

    if (!findSpot) {
        return res
          .status(404)
          .json({
            message: "Spot couldn't be found",
            statusCode: res.statusCode
          });
    };

    if (findSpot.ownerId === req.user.id) {
      return res.status(403).json({
        message: "Sorry, you can't book your own listing!",
        statusCode: 403
      });
    }

    const { startDate, endDate } = req.body;

    const bookings = await findSpot.getBookings();
    for (let i = 0; i < bookings.length; i++) {
      let booking = bookings[i];

      // conflicting start date
      if (
        (startDate >= booking.startDate && startDate <= booking.endDate) ||
        startDate === booking.startDate ||
        startDate === booking.endDate
      ) {
        return res.status(403).json({
          message:
            'Sorry, this spot is already booked for the specified dates',
          statusCode: 403,
          errors: {
            startDate: 'Start date conflicts with an existing booking'
          }
        });
      }
      // conflicting End date
      if (
        (endDate >= booking.startDate && endDate <= booking.endDate) ||
        endDate === booking.startDate ||
        endDate === booking.endDate
      ) {
        return res.status(403).json({
          message:
            'Sorry, this spot is already booked for the specified dates',
          statusCode: 403,
          errors: {
            endDate: 'End date conflicts with an existing booking'
          }
        });
      }
      if (startDate <= booking.startDate && booking.endDate <= endDate) {
        return res.status(403).json({
          message:
            'Sorry, this spot is already booked for the specified dates',
          statusCode: 403,
          errors: {
            startDate: 'Start date conflicts with an existing booking',
            endDate: 'End date conflicts with an existing booking'
          }
        });
      }
    }

      const booking = await Booking.create({
        spotId: req.params.spotId,
        userId: req.user.id,
        startDate,
        endDate
      });

      return res.json(booking);

});


//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, singleMulterUpload('image'), async (req, res) => {
    const spotId = req.params.spotId;
		const ownerId = req.user.id;

		const { preview } = req.body;
		const url = await singlePublicFileUpload(req.file);
		const findSpot = await Spot.findByPk(spotId);

		if (findSpot) {
			// authorization, make sure spot belongs to current user.
			if (ownerId !== findSpot.ownerId) {
				return res.status(403).json({ message: 'Forbidden', statusCode: 403 });
			}

			// create new spot image
			const newSpotImage = await SpotImage.build({ spotId, url, preview });
			await newSpotImage.validate();
			await newSpotImage.save();

			// associate new spot image with the specified spot
			findSpot.addSpotImage(newSpotImage);

			// formulate response
			const resNewSpot = {};
			resNewSpot.id = newSpotImage.id;
			resNewSpot.url = newSpotImage.url;
			resNewSpot.preview = newSpotImage.preview;
			return res.json(resNewSpot);
		}

		return res
			.status(404)
			.json({ message: "Spot couldn't be found", statusCode: 404 });
	}
);

//Create a Spot
router.post('/', requireAuth, validateSpot, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
      return `${msg}`;
    };
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
      return res.json({
        message: "Validation Error",
        statusCode: 400,
        errors: result.mapped()
      });
    }

    if (address.length < 3 ) {
      const err = new Error('Please provide a valid address');
      err.status = 401;
      err.title = 'Please provide a valid address';
      err.errors = ["Please provide a valid address"];
      return next(err);
    }

    if (name.length < 6) {
      const err = new Error('Please provide a longer name (6 characters or more)');
      err.status = 401;
      err.title = 'Please provide a longer name (6 characters or more)';
      err.errors = ["Please provide a longer name (6 characters or more)"];
      return next(err);
    }

    if (description.length < 30) {
      const err = new Error('Please provide a longer description (30 characters or more)');
      err.status = 401;
      err.title = 'Please provide a longer description (30 characters or more)';
      err.errors = ["Please provide a longer description (30 characters or more)"];
      return next(err);
    }

    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });

    return res.json(newSpot);
});

  //Edit a Spot
  router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
      return `${msg}`;
    };
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
      return res.json({
        message: "Validation Error",
        statusCode: 400,
        errors: result.mapped()
      });
    }

    if (address.length < 3 ) {
      const err = new Error('Please provide a valid address');
      err.status = 401;
      err.title = 'Please provide a valid address';
      err.errors = ["Please provide a valid address"];
      return next(err);
    }

    if (name.length < 6) {
      const err = new Error('Please provide a longer name (6 characters or more)');
      err.status = 401;
      err.title = 'Please provide a longer name (6 characters or more)';
      err.errors = ["Please provide a longer name (6 characters or more)"];
      return next(err);
    }

    if (description.length < 30) {
      const err = new Error('Please provide a longer description (30 characters or more)');
      err.status = 401;
      err.title = 'Please provide a longer description (30 characters or more)';
      err.errors = ["Please provide a longer description (30 characters or more)"];
      return next(err);
    }


    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        return res
          .status(404)
          .json({
            message: "Spot couldn't be found",
            statueCode: res.statusCode
            })
    };

    spot.address = address
    spot.city = city
    spot.state = state
    spot.country = country
    spot.lat = lat
    spot.lng = lng
    spot.name = name
    spot.description = description
    spot.price = price
    spot.save();

    return res.json(spot);
  });

  //Delete a Spot
  router.delete('/:spotId', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
      return res
        .status(404)
        .json({
          message: "Spot couldn't be found",
          statusCode: res.statusCode
        })
    }

    await spot.destroy();

    return res
      .status(200)
      .json({
        message: 'Successfully deleted',
        statusCode: res.statusCode
      })
  })

  module.exports = router;
