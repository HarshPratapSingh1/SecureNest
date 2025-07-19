const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

const isAuth = require('../middleware/auth');
const User = require('../models/user.model');

// Upload image to Cloudinary and save metadata to DB
router.post('/upload', isAuth, upload.single('file'), async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.uploads.push({ url: req.file.path }); // Ensure req.file.path is a valid URL
    await user.save();

    res.status(200).json({ message: 'Upload successful' });
  } catch (error) {
    console.error('Upload failed:', error);
    res.status(500).json({ message: 'Upload failed' });
  }
});


module.exports = router;
