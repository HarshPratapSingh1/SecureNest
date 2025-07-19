const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const router = express.Router();
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '1d'; 
// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email or username' });
    }


    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = new User({
      username,
      email,
      password: hashedPassword, 
    });
    await user.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
    // console.log(req.body);
  try {
    // Check user

    const user = await User.findOne({email:username});
    
    if (!user) return res.status(401).json({ message: 'Invalid Email' });

    // Check password

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) return res.status(402).json({ message: 'Invalid Password' });

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,         // required for cross-site cookies (HTTPS)
      sameSite: "None",     // required for cross-site cookies
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.json({ message: 'Login successful!' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get("/profile", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(402).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Optionally fetch user data from DB using decoded.id
    res.json({ message: "Authenticated", user: decoded });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});


module.exports = router;
