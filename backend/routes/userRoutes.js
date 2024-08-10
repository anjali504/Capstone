const express = require('express');
const { userProfile, updateProfile,changePassword, deleteUserProfile,
    getUsers,
    getUserProfile,updateUserProfileAdmin } = require('../controllers/userController');

const router = express.Router();

router.post('/getuser', userProfile);
router.put('/profile', updateProfile);
router.put('/change-password', changePassword);

router.delete('/delete', deleteUserProfile);
router.put('/update', updateUserProfileAdmin);
router.get('/users', getUsers);
router.post('/profile', getUserProfile);

module.exports = router;
