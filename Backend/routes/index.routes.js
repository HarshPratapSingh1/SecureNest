const express = require('express');
const isAuth = require('../middleware/auth');
const User = require('../models/user.model');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Landing page (public)
router.get('/', (req, res) => {
  res.render('index');
});

// Home (protected)
router.get('/home', isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).send('User not found');

    res.render('home', { user });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).send('Server Error');
  }
});

// My Gallery (protected)
router.get('/mygallery', isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Send uploaded image URLs only
    res.json(user.uploads || []);
  } catch (err) {
    console.error('Failed to fetch user uploads:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
router.delete('/delete', isAuth, async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ message: 'Image URL missing' });

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.uploads = user.uploads.filter(upload => upload.url !== url);
    await user.save();

    res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    console.error('Failed to delete image:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
