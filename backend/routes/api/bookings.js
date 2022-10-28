const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Booking, Spot, SpotImage } = require('../../db/models');

const router = express.Router();

//Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {

    const bookings = await Booking.findAll({
      where: {
        userId: req.user.id
      },
      include: [
        {
          model: Spot,
          attributes: {
            exclude: ['description', 'createdAt', 'updatedAt']
          }
        }
      ]
    });

    for (let i = 0; i < bookings.length; i++) {
      let booking = bookings[i].toJSON();

      const exists = await SpotImage.findOne({
        where: {
          preview: true,
          spotId: booking.spotId
        }
      });

      if (!exists) {
        booking.Spot.previewImage = 'No preview image'
      } else {
        booking.Spot.previewImage = exists.url
      }

      bookings[i] = booking;
    };

    return res.json({ Bookings: bookings });
});

// Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;
    const booking = await Booking.findByPk(req.params.bookingId);

    const reqStartDate = new Date(startDate).getTime();
    const reqEndDate = new Date(endDate).getTime();
    const oldStartDate = new Date(booking.startDate).getTime();
    const oldEndDate = new Date(booking.endDate).getTime();
    const currentDate = new Date().getTime();

    if (reqEndDate <= reqStartDate) {
      return res
        .status(400)
        .json({
          message: 'Validation Error',
          statusCode: res.statusCode,
          errors: [{
            endDate: 'endDate cannot come before startDate'
          }]
        });
    };

    if (!booking) {
      return res
        .status(404)
        .json({
          message: "Booking couldn't be found",
          statusCode: res.statusCode
        });
    };

    if (reqEndDate < currentDate) {
      return res
        .status(403)
        .json({
          message: "Past bookings can't be modified",
          statusCode: res.statusCode
        });
    };

    if (oldStartDate >= reqStartDate && oldEndDate <= reqEndDate
      || oldStartDate <= reqStartDate && oldEndDate >= reqEndDate) {
      return res
        .status(403)
        .json({
          message: "Sorry, this spot is already booked for the specified dates",
          statusCode: res.statusCode,
          errors: [{
            "startDate": "Start date conflicts with an existing booking",
            "endDate": "End date conflicts with an existing booking"
          }]
        });
    };

    booking.startDate = startDate;
    booking.endDate = endDate;
    booking.save();

    return res.json(booking);
  });

  // Delete a Booking
  router.delete('/:bookingId', requireAuth, async (req, res) => {

    const booking = await Booking.findByPk(req.params.bookingId);

    if (!booking) {
      return res
        .status(404)
        .json({
          message: "Booking couldn't be found",
          statusCode: res.statusCode
        });
    };

    const currentDate = new Date().getTime();
    const startDate1 = new Date(booking.startDate).getTime();

    if (startDate1 <= currentDate) {
      return res
        .status(403)
        .json({
          message: "Bookings that have been started can't be deleted",
          statusCode: res.statusCode
        });
    };

    await booking.destroy();

    return res
      .status(200)
      .json({
        message: 'Successfully deleted',
        statusCode: res.statusCode
      })
  });

module.exports = router;
