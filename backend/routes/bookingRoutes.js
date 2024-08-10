const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/', bookingController.createBooking);

router.get('/organizer/:organizerId', bookingController.getBookingsByOrganizer);

module.exports = router;
