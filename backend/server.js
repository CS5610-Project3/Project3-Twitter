const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const path = require('path');
const PORT = process.env.PORT || 3500;


// Connect to MongoDB
connectDB();

// Configure CORS middleware
const corsOptions = {
  origin: 'http://127.0.0.1:5174', // Replace with the origin you want to allow
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Enable cookies
};

// Use CORS middleware
app.use(cors(corsOptions));

// JSON Parser Middleware
app.use(express.json());

// Bodyparser Middleware
app.use(express.urlencoded({ extended: true }));

// Cookie Parser Middleware
app.use(cookieParser());

// Routes
app.use('/api/auth/', require('./routes/authRoutes'));
app.use('/api/post/', require('./routes/postRoutes'));
app.use('/api/user/', require('./routes/userRoutes'));


let frontend_dir = path.join(__dirname, '..', 'p3client', 'dist')

app.use(express.static(frontend_dir));
app.get('*', function (req, res) {
    console.log("received request");
    res.sendFile(path.join(frontend_dir, "index.html"));
});

mongoose.connection.once("open", () => {
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });