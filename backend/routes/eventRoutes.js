const express = require('express');
const router = express.Router();
const {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent,getEventById,reduceTickets
} = require('../controllers/eventController');

router.post('/create', createEvent);
router.get('/get', getEvents);
router.get('/get/:id', getEventById);

router.put('/update/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.put('/reduce-tickets', reduceTickets);

module.exports = router;
