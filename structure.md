storage-management-system/
│-- src/
│   │-- config/
│   │   ├── db.js                # Database connection configuration
│   │-- controllers/             # Controllers (business logic)
│   │   ├── userController.js
│   │   ├── passwordResetController.js
│   │   ├── storageController.js
│   │   ├── fileController.js
│   │   ├── folderController.js
│   │   ├── homeController.js
│   │   ├── calendarController.js
│   │   ├── searchController.js
│   │-- middlewares/             # Middlewares (authentication, validation, etc.)
│   │   ├── authMiddleware.js
│   │-- models/                  # Database models
│   │   ├── User.js
│   │   ├── Storage.js
│   │   ├── File.js
│   │   ├── Folder.js
│   │-- routes/                  # API Routes
│   │   ├── userRoutes.js
│   │   ├── passwordResetRoutes.js
│   │   ├── storageRoutes.js
│   │   ├── fileRoutes.js
│   │   ├── folderRoutes.js
│   │   ├── homeRoutes.js
│   │   ├── calendarRoutes.js
│   │   ├── searchRoutes.js
│   │-- services/                # Service Layer (Optional: Additional business logic)
│   │-- utils/                   # Utility functions
│   │-- app.js                   # Main Express Application
│   └── server.js                # Server Entry Point
│-- uploads/                     # Directory for storing uploaded files (if using local storage)
│-- .env                          # Environment Variables
│-- .gitignore                    # Git Ignore File
│-- package.json                  # Dependencies & Scripts
│-- README.md                     # Documentation
