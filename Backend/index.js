const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoutes = require('./routes/user.routes.js');
const indexRouter = require('./routes/index.routes.js');
const uploadRoutes = require('./routes/upload.routes.js');
const connectDB = require('./config/db');
const downloadRoutes = require('./routes/download.routes');


// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
const allowedOrigins = [
  'https://securenesttt.netlify.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/', indexRouter);
app.use('/', userRoutes);
app.use('/', uploadRoutes);
app.use('/', downloadRoutes);

// Start server
const Port = process.env.PORT || 3000;
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});
