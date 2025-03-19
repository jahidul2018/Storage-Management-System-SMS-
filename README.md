# 📦 Storage Management System API

The **Storage Management System API** is a **Node.js-based backend** built with **Express.js** and **MongoDB**. It provides **file and folder management**, **user authentication**, **storage tracking**, and **calendar-based item retrieval**.

---

## 📌 **Features**
### ✅ **User Authentication**
- Register & login users securely.
- JWT-based authentication for protected routes.
- Password reset via email verification.

### ✅ **File & Folder Management**
- Upload and manage files (Images, PDFs, Notes).
- Organize files into folders.
- Mark files as favorites.

### ✅ **Storage Tracking**
- 15GB total storage quota per user.
- Track used & remaining storage dynamically.
- Delete files to free up space.

### ✅ **Calendar-Based Retrieval**
- View files, folders, and notes created on a specific date.

### ✅ **Search Functionality**
- Full-text search for files, folders, and notes.

### ✅ **API Documentation**
- Fully documented with Swagger UI.

---

## 📌 **Technology Stack**
| Category            | Technologies |
|--------------------|--------------|
| **Backend**        | Node.js, Express.js |
| **Database**       | MongoDB (Mongoose ORM) |
| **Authentication** | JWT (JSON Web Token) |
| **Storage**        | Multer for file uploads, DigitalOcean Spaces (optional) |
| **API Docs**       | Swagger UI |
| **Testing**        | Jest & Supertest |
| **Deployment**     | Docker, Nginx, DigitalOcean |
| **Logging**        | Morgan |

---

## 📌 **Project Structure**
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


---

## 📌 **API Endpoints**
### **👤 User Management**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/users/register` | Register a new user |
| `POST` | `/api/users/login` | Login & get JWT token |
| `GET` | `/api/users/profile` | Get user profile |
| `PUT` | `/api/users/profile` | Update user profile |
| `DELETE` | `/api/users/profile` | Delete user account |

### **📂 File & Folder Management**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/files/upload` | Upload a file |
| `GET` | `/api/files/all` | List all files |
| `GET` | `/api/files/images` | List image files |
| `GET` | `/api/files/pdfs` | List PDF files |
| `GET` | `/api/files/notes` | List note files |
| `GET` | `/api/files/{fileId}` | Get file details |
| `PUT` | `/api/files/{fileId}` | Rename file |
| `DELETE` | `/api/files/{fileId}` | Delete file |
| `POST` | `/api/folders/create` | Create a folder |
| `GET` | `/api/folders/` | List all folders |
| `GET` | `/api/folders/{folderId}` | Get folder details |
| `PUT` | `/api/folders/{folderId}` | Rename folder |
| `DELETE` | `/api/folders/{folderId}` | Delete folder |

### **📊 Storage & Cleanup**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/storage` | Get storage usage details |
| `DELETE` | `/api/cleanup/delete/{fileId}` | Delete file & update storage |

### **📆 Calendar-Based Retrieval**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/calendar/{date}` | Get items by creation date |

### **🔍 Search**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/search?query=xyz` | Search files, folders, and notes |

---

## 📌 **Authentication & Security**
- Uses **JWT Authentication** for API security.
- Protects **sensitive routes** (`/profile`, `/upload`, `/delete`) with middleware.
- Ensures **secure file handling** using **Multer**.

---

## 📌 **How to Run Locally**
### **1️⃣ Install Dependencies**
```sh
npm install
## start the server
node src/server.js

3️⃣ Access API Docs
📄 Swagger UI:
http://localhost:5000/api/docs

📌 Future Enhancements
Multi-user access with roles (Admin, Manager, User).
File versioning system.
Cloud storage integration (AWS S3, DigitalOcean Spaces).
Advanced analytics dashboard.

📌 Contributors
Backend Developer: Jahidul Alam Mishuk
Database Architect: Jahidul Alam Mishuk
API Documentation: Jahidul Alam Mishuk
