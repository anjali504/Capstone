
const Booking = require('../models/Booking');
const Event = require('../models/eventModel');
exports.createBooking = async (req, res) => {
    const { user, events } = req.body;
  
    try {
      const newBooking = new Booking({
        user,
        events
      });
  
      const savedBooking = await newBooking.save();
      res.status(201).json(savedBooking);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Get bookings for a specific organizer
  exports.getBookingsByOrganizer = async (req, res) => {
    const organizerId = req.params.organizerId;
  
    try {
      const events = await Event.find({ organizerId });
      const eventIds = events.map(event => event._id);
  
      const bookings = await Booking.find({ 'events.event': { $in: eventIds } })
        .populate('events.event')
        .populate('user');
      
      // Filter bookings to include only events created by the organizer
      const filteredBookings = bookings.filter(booking => 
        booking.events.some(event => event.event.organizerId.toString() === organizerId)
      );
  
      res.status(200).json(filteredBookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };