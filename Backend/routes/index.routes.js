const express = require('express');
const isAuth = require('../middleware/auth');
const User = require('../models/user.model');

const router = express.Router();

// Landing page (public) — let React handle it
router.get('/', (req, res) => {
  res.send('Welcome to the landing page. React will handle routing.');
});

// Home (protected) — send user data to React
router.get('/home', isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ user });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// My Gallery (protected) — return uploaded image data
router.get('/mygallery', isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    console.log(user);
    if (!user) return res.status(402).json({ message: 'User not found' });

    res.json(user.uploads || []);
  } catch (err) {
    console.error('Failed to fetch user uploads:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete image by URL (protected)
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
