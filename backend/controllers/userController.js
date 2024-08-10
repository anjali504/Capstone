const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const userProfile = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email)
    const user =  await User.findOne({ email });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateProfile = async (req, res) => {
  const { email,firstName, lastName, dateOfBirth, phoneNumber, address, city, country, zipCode } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.dateOfBirth = dateOfBirth || user.dateOfBirth;
      user.phoneNumber = phoneNumber || user.phoneNumber;
      user.address = address || user.address;
      user.city = city || user.city;
      user.country = country || user.country;
      user.zipCode = zipCode || user.zipCode;

      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword,email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(currentPassword))) {
      user.password = newPassword;
      await user.save();
      res.json({ message: 'Password updated successfully' });
    } else {
      res.status(400).json({ message: 'Current password is incorrect' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
const deleteUserProfile = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOneAndDelete({ email });
    if (user) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
const updateUserProfileAdmin = async (req, res) => {
  const { email, firstName, lastName, dateOfBirth, phoneNumber, address, city, country, zipCode } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.dateOfBirth = dateOfBirth || user.dateOfBirth;
      user.phoneNumber = phoneNumber || user.phoneNumber;
      user.address = address || user.address;
      user.city = city || user.city;
      user.country = country || user.country;
      user.zipCode = zipCode || user.zipCode;

      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
module.exports = {
  userProfile,
  updateProfile,
  changePassword,
  deleteUserProfile,
  getUsers,
  getUserProfile,
  updateUserProfileAdmin

};
