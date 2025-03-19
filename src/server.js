const http = require('http');
const dotenv = require('dotenv');
const app = require('./app');

// Load Environment Variables
dotenv.config();

// Define Port
const PORT = process.env.PORT || 5000;

// Create HTTP Server
const server = http.createServer(app);

// Start Server
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// Graceful Shutdown Handling
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully...');
    server.close(() => {
        console.log('Process terminated');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully...');
    server.close(() => {
        console.log('Process terminated');
        process.exit(0);
    });
});
