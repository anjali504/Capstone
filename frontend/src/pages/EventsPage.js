import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/events/get')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const handleEditClickOpen = (event) => {
    setCurrentEvent(event);
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleDeleteClickOpen = (event) => {
    setCurrentEvent(event);
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleDeleteEvent = () => {
    fetch(`http://localhost:5000/api/events/${currentEvent._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(() => {
        setEvents(events.filter(event => event._id !== currentEvent._id));
        handleDeleteClose();
      })
      .catch(error => console.error('Error deleting event:', error));
  };

  const handleEditEvent = () => {
    fetch(`/api/events/${currentEvent._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(currentEvent)
    })
      .then(response => response.json())
      .then(updatedEvent => {
        setEvents(events.map(event => (event._id === updatedEvent._id ? updatedEvent : event)));
        handleEditClose();
      })
      .catch(error => console.error('Error updating event:', error));
  };

  return (
    <div>
      <Typography paragraph>Events Management</Typography>
      {events.length > 0 ? (
        <Grid container spacing={2}>
          {events.map((event) => (
            <Grid item xs={12} md={6} key={event._id}>
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Typography variant="h5" component="div">
                        {event.eventName}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {event.description}
                      </Typography>
                      <Typography>Date: {new Date(event.date).toLocaleDateString()}</Typography>
                      <Typography>Time: {event.time}</Typography>
                      <Typography>Venue: {event.venue}</Typography>
                      <Typography>City: {event.city}</Typography>
                      <Typography>State: {event.state}</Typography>
                      <Typography>Country: {event.country}</Typography>
                      <Typography>Zip Code: {event.zipCode}</Typography>
                      <Typography>Phone Number: {event.phoneNumber}</Typography>
                      <Typography>Email Address: {event.emailAddress}</Typography>
                      <Typography>Ticket Price: ${event.ticketPrice}</Typography>
                      <Typography>Available Tickets: {event.availableTickets}</Typography>
                      <Typography>Event Category: {event.eventCategory}</Typography>
                    </Grid>
                    {event.imageId && (
                      <Grid item xs={12} md={4}>
                        <img
                          src={`data:${event.imageId.contentType};base64,${event.imageId.imageBase64}`}
                          alt={event.eventName}
                          style={{ width: '100%', height: 'auto' }}
                        />
                      </Grid>
                    )}
                  </Grid>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => handleEditClickOpen(event)}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDeleteClickOpen(event)}><DeleteIcon /></IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No events found</Typography>
      )}

      <Dialog open={openEdit} onClose={handleEditClose}>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please edit the event details.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Event Name"
            type="text"
            fullWidth
            value={currentEvent?.eventName || ''}
            onChange={(e) => setCurrentEvent({ ...currentEvent, eventName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={currentEvent?.description || ''}
            onChange={(e) => setCurrentEvent({ ...currentEvent, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            value={currentEvent?.date ? new Date(currentEvent.date).toISOString().split('T')[0] : ''}
            onChange={(e) => setCurrentEvent({ ...currentEvent, date: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Time"
            type="text"
            fullWidth
            value={currentEvent?.time || ''}
            onChange={(e) => setCurrentEvent({ ...currentEvent, time: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Venue"
            type="text"
            fullWidth
            value={currentEvent?.venue || ''}
            onChange={(e) => setCurrentEvent({ ...currentEvent, venue: e.target.value })}
          />
          <TextField
            margin="dense"
            label="City"
            type="text"
            fullWidth
            value={currentEvent?.city || ''}
            onChange={(e) => setCurrentEvent({ ...currentEvent, city: e.target.value })}
          />
          <TextField
            margin="dense"
            label="State"
            type="text"
            fullWidth
            value={currentEvent?.state || ''}
            onChange={(e) => setCurrentEvent({ ...currentEvent, state: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Country"
            type="text"
            fullWidth
            value={currentEvent?.country || ''}
            onChange={(e) => setCurrentEvent({ ...currentEvent, country: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Zip Code"
            type="text"
            fullWidth
            value={currentEvent?.zipCode || ''}
            onChange={(e) => setCurrentEvent({ ...currentEvent, zipCode: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            type="text"
            fullWidth
            value={currentEvent?.phoneNumber || ''}
            onChange={(e) => setCurrentEvent({ ...currentEvent, phoneNumber: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email Address"
            type="text"
            fullWidth
            value={currentEvent?.emailAddress || ''}
            onChange={(e) => setCurrentEvent({ ...currentEvent, emailAddress: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Ticket Price"
            type="number"
            fullWidth
            value={currentEvent?.ticketPrice || ''}
            onChange={(e) => setCurrentEvent({ ...currentEvent, ticketPrice: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Available Tickets"
            type="number"
            fullWidth
            value={currentEvent?.availableTickets || ''}
            onChange={(e) => setCurrentEvent({ ...currentEvent, availableTickets: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Event Category"
            type="text"
            fullWidth
            value={currentEvent?.eventCategory || ''}
            onChange={(e) => setCurrentEvent({ ...currentEvent, eventCategory: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditEvent}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDelete} onClose={handleDeleteClose}>
        <DialogTitle>Delete Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {currentEvent?.eventName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button onClick={handleDeleteEvent}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EventsPage;
