const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Booking, Spot, SpotImage } = require('../../db/models');

const router = express.Router();

//Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {

    const allBookings = await Booking.findAll({
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

    for (let i = 0; i < allBookings.length; i++) {
      let currBooking = allBookings[i].toJSON();

      const bookingPrev = await SpotImage.findOne({
        where: {
          preview: true,
          spotId: currBooking.spotId
        }
      });

      if (!bookingPrev) {
        currBooking.Spot.previewImage = 'No preview image available!'
      } else {
        currBooking.Spot.previewImage = bookingPrev.url
      }

      allBookings[i] = currBooking;
    };

    return res.json({ Bookings: allBookings });
  });

  // Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;
    const findBooking = await Booking.findByPk(req.params.bookingId);

    if (!startDate || !endDate || endDate <= startDate) {
      return res
        .status(400)
        .json({
          message: 'Validation Error',
          statusCode: res.statusCode,
          errors: [{
            endDate: 'End date cannot come before Start Date'
          }]
        });
    };

    if (!findBooking) {
      return res
        .status(404)
        .json({
          message: "Booking couldn't be found",
          statusCode: res.statusCode
        });
    };

    if (endDate < findBooking.endDate) {
      return res
        .status(403)
        .json({
          message: "Past bookings can't be modified",
          statusCode: res.statusCode
        });
    };

    if (
      findBooking.startDate >= startDate && findBooking.endDate <= endDate ||

      findBooking.startDate <= startDate && findBooking.endDate >= endDate) {

      return res
        .status(403)
        .json({
          message: 'Sorry, this spot is already booked for the specified dates',
          statusCode: res.statusCode,
          errors: [{
            startDate: 'Start date conflicts with an already existing booking',
            endDate: 'End date conflicts with an already existing booking'
          }]
        });
    };

    findBooking.startDate = startDate;
    findBooking.endDate = endDate;
    findBooking.save();

    return res.json(findBooking);
  });

  // Delete a Booking
  router.delete('/:bookingId', requireAuth, async (req, res) => {

    const findBooking = await Booking.findByPk(req.params.bookingId);

    if (!findBooking) {
      return res
        .status(404)
        .json({
          message: "Booking couldn't be found",
          statusCode: res.statusCode
        });
    };

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let currDate = `${year}-${month}-${day}`;

    if (findBooking.startDate <= currDate) {
      return res
        .status(403)
        .json({
          message: "Bookings that have been started can't be deleted",
          statusCode: res.statusCode
        });
    };

    await findBooking.destroy();

    return res
      .status(200)
      .json({
        message: 'Successfully deleted',
        statusCode: res.statusCode
      })
  });

module.exports = router;
