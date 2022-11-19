const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');

const { Op } = require('sequelize');

const router = express.Router();

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
    const spots = await Spot.findAll({
        where: {
          ownerId: req.user.id
        }
    });

    const spotsArray = [];

    for (let i = 0; i < spots.length; i++) {
        let currentSpot = spots[i].toJSON();

        const starTotal = await Review.sum('stars', { where: { spotId: currentSpot.id } });
        const reviewTotal = await Review.count({ where: { spotId: currentSpot.id } });

        if (!starTotal) {
          currentSpot.avgRating = 0;
        } else {
          currentSpot.avgRating = (starTotal / reviewTotal).toFixed(1);
        }

        const image = await SpotImage.findOne({
          where: {
            [Op.and]: [
              { spotId: currentSpot.id },
              { preview: true }
            ]
          }
        });

        if (!image) {
          currentSpot.previewImage = 'No images!'
        } else {
          currentSpot.previewImage = image.url
        }

        spotsArray.push(currentSpot);
      }

      return res.json({ Spots: spotsArray });
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
        current.avgRating = 'Not yet rated'
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
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        return res
            .status(404)
            .json({
            message: "Spot couldn't be found",
            statusCode: res.statusCode
            });
    };

    const { review, stars } = req.body;

    if (!review || !stars ) {
        return res
          .status(404)
          .json({
            message: 'Validation Error',
            statusCode: res.statusCode,
            errors: [{
              review: 'Review text is required',
              stars: 'Stars must be an integer from 1 to 5'
            }]
          })
      };

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
router.post('/:spotId/bookings', requireAuth, async (req, res) =>{
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        return res
          .status(404)
          .json({
            message: "Spot couldn't be found",
            statusCode: res.statusCode
          });
    };

    const { startDate, endDate } = req.body;

    const reqStartDate = new Date(startDate).getTime()
    const reqEndDate = new Date(endDate).getTime()

    if (reqStartDate >= reqEndDate) {
        return res
          .status(400)
          .json({
            message: 'Validation Error',
            statusCode: res.statusCode,
            errors: [{
              endDate: 'endDate cannot be on or before startDate'
            }]
          })
    };

    const bookings = await Booking.findAll({
        where: {
          spotId: spot.id
        }
    });

    for (let i = 0; i < bookings.length; i++) {
      let oldStartDate = new Date(bookings[i].startDate).getTime();
      let oldEndDate = new Date(bookings[i].endDate).getTime();
        if (oldStartDate >= reqStartDate && oldEndDate <= reqEndDate
          || oldStartDate <= reqStartDate && oldEndDate >= reqEndDate) {
          return res
            .status(403)
            .json({
              message: 'Sorry, this spot is already booked for the specified dates',
              statusCode: res.statusCode,
              errors: [{
                startDate: 'Start date conflicts with an already existing booking',
                endDate: 'End date conflicts with an already existing booking'
              }]
            })
        }
      };

      const booking = await Booking.create({
        spotId: req.params.spotId,
        userId: req.user.id,
        startDate,
        endDate
      });

      return res.json(booking);

});


//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const { url, preview } = req.body;

  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    return res
      .status(404)
      .json({
        message: "Spot couldn't be found",
        statusCode: res.statusCode
      });
  };

  const newImage = await SpotImage.create({
    spotId: spot.id,
    url,
    preview
  });

  return res.json({
    id: newImage.id,
    url,
    preview
  });
});

//Create a Spot
router.post('/', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
        return res
          .status(400)
          .json({
            message: "Validation Error",
            statusCode: res.statusCode,
            errors: [{
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
                "name": "Name must be less than 50 characters",
                "description": "Description is required",
                "price": "Price per day is required"
            }]
        });
    };

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
  router.put('/:spotId', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
        return res.status(400).json({
          message: 'Validation Error',
          statusCode: 400,
          errors: [{
            address: 'Street address is required',
            city: 'City is required',
            state: 'State is required',
            country: 'Country is required',
            lat: 'Latitude is not valid',
            lng: 'Longitude is not valid',
            name: 'Name must be less than 50 characters',
            description: 'Description is required',
            price: 'Price per day is required'
          }]
        });
    };

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
