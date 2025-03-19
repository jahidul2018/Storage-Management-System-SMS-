const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');
const setupSwagger = require('./config/swagger'); // ✅ Import Swagger

// Import Routes
const userRoutes = require('./routes/userRoutes');
const passwordResetRoutes = require('./routes/passwordResetRoutes');
const storageRoutes = require('./routes/storageRoutes');
const fileRoutes = require('./routes/fileRoutes');
const folderRoutes = require('./routes/folderRoutes');
const homeRoutes = require('./routes/homeRoutes');
const calendarRoutes = require('./routes/calendarRoutes');
// const searchRoutes = require('./routes/searchRoutes');
const storageCleanupRoutes = require('./routes/storageCleanupRoutes');

// Load Environment Variables
dotenv.config();

// Initialize Express App
const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));


// Setup Swagger Documentation
setupSwagger(app);


// Static Folder for File Uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/password', passwordResetRoutes);
app.use('/api/storage', storageRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/folders', folderRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/calendar', calendarRoutes);
// app.use('/api/search', searchRoutes);
app.use('/api/cleanup', storageCleanupRoutes);

// Root Route
app.get('/', (req, res) => {
    res.send('Storage Management System API is running...');
});

// Global Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
});

module.exports = app;
