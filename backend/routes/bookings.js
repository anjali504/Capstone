const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Event = require('../models/eventModel');

router.get('/organizer/:organizerId', async (req, res) => {
  try {
    const organizerId = req.params.organizerId;
    const events = await Event.find({ organizerId });
    const eventIds = events.map(event => event._id);

    const bookings = await Booking.find({ event: { $in: eventIds } }).populate('event').populate('user');

    res.json(bookings);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
