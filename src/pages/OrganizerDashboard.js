import React, { useState, useEffect, useContext } from 'react';
import '../stylesheet/Dashboard.css';
import { AuthContext } from '../context/AuthContext';

function OrganizerDashboard() {
    const [showForm, setShowForm] = useState(false);
    const [events, setEvents] = useState([]);
    const { organizer } = useContext(AuthContext); // Getting the organizer from AuthContext
    console.log(organizer);
    const [formData, setFormData] = useState({
        eventName: '',
        description: '',
        date: '',
        time: '',
        venue: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        phoneNumber: '',
        emailAddress: '',
        ticketPrice: '',
        availableTickets: '',
        eventCategory: '',
        eventImage: null
    });
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [image, setImage] = useState(null);
    const backend = "https://capstone-a5ic.onrender.com";

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch(`${backend}/api/events/get?organizerId=${organizer._id}`);
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleShowForm = () => {
        setShowForm(!showForm);
        setEditMode(false);
        setFormData({
            eventName: '',
            description: '',
            date: '',
            time: '',
            venue: '',
            city: '',
            state: '',
            country: '',
            zipCode: '',
            phoneNumber: '',
            emailAddress: '',
            ticketPrice: '',
            availableTickets: '',
            eventCategory: '',
            eventImage: null
        });
        setImage(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage({
                filename: file.name,
                contentType: file.type,
                imageBase64: reader.result.split(',')[1]
            });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const eventData = { ...formData, organizerId: organizer._id }; // Adding organizerId to the event data

        if (image) {
            eventData.imageBase64 = image.imageBase64;
            eventData.filename = image.filename;
            eventData.contentType = image.contentType;
        } else if (editMode && editId) {
            const currentEvent = events.find(event => event._id === editId);
            if (currentEvent && currentEvent.imageId) {
                eventData.imageId = currentEvent.imageId._id;
            }
        }

        const url = editMode ? `${backend}/api/events/update/${editId}` : `${backend}/api/events/create`;
        const method = editMode ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventData)
            });
            const data = await response.json();
            console.log('Success:', data);
            fetchEvents();
            handleShowForm();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleEdit = (event) => {
        setEditMode(true);
        setEditId(event._id);
        setFormData({
            eventName: event.eventName,
            description: event.description,
            date: event.date.split('T')[0],
            time: event.time,
            venue: event.venue,
            city: event.city,
            state: event.state,
            country: event.country,
            zipCode: event.zipCode,
            phoneNumber: event.phoneNumber,
            emailAddress: event.emailAddress,
            ticketPrice: event.ticketPrice,
            availableTickets: event.availableTickets,
            eventCategory: event.eventCategory,
            eventImage: null
        });
        setShowForm(true);
        setImage(null);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${backend}/api/events/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchEvents();
            } else {
                console.error('Error deleting event:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="page-content-wrapper">
                <div className="container-admin">
                    <h1>Event Management</h1>
                    <button className="admin-add" onClick={handleShowForm}>
                        {showForm ? 'Hide Form' : 'Add Event'}
                    </button>
                </div>

                {showForm && (
                    <div id="add-event-form">
                        <h2>{editMode ? 'Edit Event' : 'Add Event'}</h2>
                        <form onSubmit={handleSubmit}>
                            {/* Form fields */}
                            <div className="form-group">
                                <label>Event Name</label>
                                <input
                                    type="text"
                                    name="eventName"
                                    value={formData.eventName}
                                    onChange={handleInputChange}
                                    placeholder="Enter event name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Enter description"
                                    rows={3}
                                    required
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label>Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Time</label>
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Venue</label>
                                <input
                                    type="text"
                                    name="venue"
                                    value={formData.venue}
                                    onChange={handleInputChange}
                                    placeholder="Enter venue"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="Enter city"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    placeholder="Enter state"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    placeholder="Enter country"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Zip Code</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                    placeholder="Enter zip code"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    placeholder="Enter phone number"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="emailAddress"
                                    value={formData.emailAddress}
                                    onChange={handleInputChange}
                                    placeholder="Enter email address"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Ticket Price</label>
                                <input
                                    type="number"
                                    name="ticketPrice"
                                    value={formData.ticketPrice}
                                    onChange={handleInputChange}
                                    placeholder="Enter ticket price"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Available Tickets</label>
                                <input
                                    type="number"
                                    name="availableTickets"
                                    value={formData.availableTickets}
                                    onChange={handleInputChange}
                                    placeholder="Enter available tickets"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Event Category</label>
                                <input
                                    type="text"
                                    name="eventCategory"
                                    value={formData.eventCategory}
                                    onChange={handleInputChange}
                                    placeholder="Enter event category"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Upload Event Image</label>
                                <input
                                    type="file"
                                    multiple
                                    name="eventImage"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <button type="submit" className="submit-btn">
                                {editMode ? 'Update' : 'Submit'}
                            </button>
                        </form>
                    </div>
                )}
                <div id="event-list">
                    {events.map(event => (
                        <div key={event._id} className="event-item">
                            <div className="event-image">
                                {event.imageId && (
                                    <img
                                        src={`data:${event.imageId.contentType};base64,${event.imageId.imageBase64}`}
                                        alt={event.eventName}
                                        className="event-image"
                                    />
                                )}
                            </div>
                            <div className="event-details">
                                <h3>{event.eventName}</h3>
                                <div className="date-time-container">
                                    <div className="date-time">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar" viewBox="0 0 16 16">
                                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1zm1-1h12V3a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v1z"/>
                                        </svg>
                                        <p>{event.date}</p>
                                    </div>
                                    <div className="date-time">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                                            <path d="M8 3.5a.5.5 0 0 1 .5.5v4H11a.5.5 0 0 1 0 1H8a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5zm0-2.5a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 1a6 6 0 1 1 0 12A6 6 0 0 1 8 2z"/>
                                        </svg>
                                        <p>{event.time}</p>
                                    </div>
                                </div>
                                <div className="venue">
                                    <p>Venue: {event.venue}</p>
                                </div>
                                <div className='venue'>
                                    <p>{event.city}, {event.state}, {event.country}, {event.zipCode}</p>
                                </div>
                                <div className="contact-details">
                                    <p>Phone: {event.phoneNumber}</p>
                                    <p>Email: {event.emailAddress}</p>
                                </div>
                                <div className="ticket-info">
                                    <p>Price: $ {event.ticketPrice}</p>
                                </div>
                                <div className="ticket-info">
                                    <p>Available Tickets: {event.availableTickets}</p>
                                    <p>Event Category: {event.eventCategory}</p>
                                </div>
                                <div className="description">
                                    <p>{event.description}</p>
                                </div>
                                <div className="event-buttons">
                                    <button className='admin-add' onClick={() => handleEdit(event)}>Edit</button>
                                    <button onClick={() => handleDelete(event._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OrganizerDashboard;
