const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    emailAddress: { type: String, required: true },
    ticketPrice: { type: Number, required: true },
    availableTickets: { type: Number, required: true },
    eventCategory: { type: String, required: true },
    imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Event', EventSchema);
