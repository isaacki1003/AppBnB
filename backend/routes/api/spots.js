const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');

const { Op } = require('sequelize');

const router = express.Router();

// Get all Spots
router.get('/', async (req, res) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    page = parseInt(page);
    size = parseInt(size);

    if (!page) {
      page = 1
    };

    if (!size || size > 20) {
      size = 20
    };

    if (page < 0 || size < 0 || minPrice < 0 || maxPrice < 0) {
      return res
        .status(400)
        .json({
          message: 'Validation Error',
          statusCode: res.statusCode,
          errors: [{
            page: 'Page must be greater than or equal to 0',
            size: 'Size must be greater than or equal to 0',
            maxLat: 'Maximum latitude is invalid',
            minLag: 'Minimum latitude is invalid',
            minLng: 'Maximum longitude is invalid',
            maxLng: 'Minimum longitude is invalid',
            minPrice: 'Maximum price must be greater than or equal to 0',
            maxPrice: 'Minimum price must be greater than or equal to 0'
          }]
        })
    };


    let pagination = {};

    if (page >= 0 && size >= 0) {
      pagination.limit = size;
      pagination.offset = size * (page - 1)
    };

    const allSpots = await Spot.findAll({
      ...pagination
    });

    const spotsRes = [];

    for (let i = 0; i < allSpots.length; i++) {
      let currSpot = allSpots[i].toJSON();

      const reviewSum = await Review.sum('stars', {
        where: { spotId: currSpot.id }
      })

      const reviewCount = await Review.count({
        where: { spotId: currSpot.id }
      });

      if (!reviewSum) {
        currSpot.avgRating = 'Not yet rated'
      } else {
        currSpot.avgRating = (reviewSum / reviewCount).toFixed(1)
      };

      const prevImage = await SpotImage.findOne({
        where: {
          preview: true,
          spotId: currSpot.id
        }
      });

      if (!prevImage) {
        currSpot.previewImage = 'None available'
      } else {
        currSpot.previewImage = prevImage.url
      };

      spotsRes.push(currSpot);
    }

    return res.json({ Spots: spotsRes, page, size });
  });

  module.exports = router;
