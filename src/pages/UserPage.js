import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch('https://capstone-a5ic.onrender.com:5000/api/user/users')
      .then(response => response.json())
      .then(data => {
        const userList = data.filter(user => user.role === 'user');
        const organizerList = data.filter(user => user.role === 'organizer');
        setUsers(userList);
        setOrganizers(organizerList);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleEditClickOpen = (user) => {
    setCurrentUser(user);
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleDeleteClickOpen = (user) => {
    setCurrentUser(user);
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleDeleteUser = () => {
    fetch('https://capstone-a5ic.onrender.com:5000/api/user/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: currentUser.email })
    })
      .then(response => response.json())
      .then(() => {
        if (currentUser.role === 'user') {
          setUsers(users.filter(user => user.email !== currentUser.email));
        } else {
          setOrganizers(organizers.filter(user => user.email !== currentUser.email));
        }
        handleDeleteClose();
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleEditUser = () => {
    fetch('https://capstone-a5ic.onrender.com:5000/api/user/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(currentUser)
    })
      .then(response => response.json())
      .then(updatedUser => {
        if (updatedUser.role === 'user') {
          setUsers(users.map(user => (user.email === updatedUser.email ? updatedUser : user)));
        } else {
          setOrganizers(organizers.map(user => (user.email === updatedUser.email ? updatedUser : user)));
        }
        handleEditClose();
      })
      .catch(error => console.error('Error updating user:', error));
  };

  return (
    <div>
      <Typography paragraph>User Management</Typography>

      <Typography variant="h6" component="div">Users</Typography>
      {users.length > 0 ? (
        <div>
          {users.map((user) => (
            <Card key={user.email} sx={{ minWidth: 275, marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {user.email}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleEditClickOpen(user)}><EditIcon /></IconButton>
                <IconButton onClick={() => handleDeleteClickOpen(user)}><DeleteIcon /></IconButton>
              </CardActions>
            </Card>
          ))}
        </div>
      ) : (
        <Typography>No users found</Typography>
      )}

      <Typography variant="h6" component="div">Organizers</Typography>
      {organizers.length > 0 ? (
        <div>
          {organizers.map((user) => (
            <Card key={user.email} sx={{ minWidth: 275, marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {user.email}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleEditClickOpen(user)}><EditIcon /></IconButton>
                <IconButton onClick={() => handleDeleteClickOpen(user)}><DeleteIcon /></IconButton>
              </CardActions>
            </Card>
          ))}
        </div>
      ) : (
        <Typography>No organizers found</Typography>
      )}

      <Dialog open={openEdit} onClose={handleEditClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please edit the user details.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            type="text"
            fullWidth
            value={currentUser?.firstName || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, firstName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Last Name"
            type="text"
            fullWidth
            value={currentUser?.lastName || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, lastName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={currentUser?.email || ''}
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditUser}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDelete} onClose={handleDeleteClose}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {currentUser?.firstName} {currentUser?.lastName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button onClick={handleDeleteUser}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserPage;
