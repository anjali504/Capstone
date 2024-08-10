const Event = require('../models/eventModel');
const Image = require('../models/imageModel');

const createEvent = async (req, res) => {
    try {
        const { imageBase64, filename, contentType, ...eventData } = req.body;

        let image = null;
        if (imageBase64) {
            image = new Image({ filename, contentType, imageBase64 });
            await image.save();
            eventData.imageId = image._id;
        }

        const event = new Event(eventData);
        await event.save();

        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEvents = async (req, res) => {
    try {
        const { organizerId, query } = req.query;
        const searchCriteria = {
            ...(organizerId && { organizerId }),  // Add organizerId to search criteria if it exists
            ...(query && {
                $or: [
                    { eventName: new RegExp(query, 'i') },
                    { eventCategory: new RegExp(query, 'i') }
                ]
            })
        };
        const events = await Event.find(searchCriteria).populate('imageId');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




const updateEvent = async (req, res) => {
    try {
        const { imageBase64, filename, contentType, ...eventData } = req.body;

        let event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (imageBase64) {
            let image = await Image.findById(event.imageId);
            if (image) {
                image.filename = filename;
                image.contentType = contentType;
                image.imageBase64 = imageBase64;
                await image.save();
            } else {
                image = new Image({ filename, contentType, imageBase64 });
                await image.save();
                eventData.imageId = image._id;
            }
        }

        event = await Event.findByIdAndUpdate(req.params.id, eventData, { new: true });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteEvent = async (req, res) => {
    try {
        console.log(req.params.id);
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.imageId) {
            await Image.findByIdAndDelete(event.imageId);
        }

        await Event.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEventById = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id).populate('imageId');
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const reduceTickets = async (req, res) => {
    try {
        const { eventId, quantity } = req.body;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.availableTickets < quantity) {
            return res.status(400).json({ message: 'Not enough tickets available' });
        }

        event.availableTickets -= quantity;
        await event.save();

        res.status(200).json({ message: 'Tickets successfully reduced', event });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent,
    getEventById,reduceTickets
};
