Here’s the complete breakdown of the Storage Management System (SMS) REST API requirements, ensuring a clean, maintainable code structure using Node.js, Express.js, MongoDB, and following the MVC pattern.

📌 Requirement List
1. User Authentication & Account Management
✅ User Register
✅ User Login
✅ User Forgot Password (Send verification code)
✅ User Verify with Code
✅ User Reset Password

2. Storage Management & Quota
✅ Total Storage Limit: 15GB
✅ Track Storage Usage (Monitor user’s storage usage)
✅ Calculate Remaining Storage and display in the API response

3. File Management
✅ Allowed file types:

Images (JPG, PNG, etc.)
PDFs
Notes (Plain text, Markdown, etc.)
✅ Upload & Store Files
✅ List Files Separately (Each file type has a separate list)
✅ Search Option (Find images, PDFs, notes, and folders by name)
✅ Show creation & modification dates for each file
✅ Favorite List (Users can mark files/folders as favorites)

4. Folder Management
✅ Create new folders
✅ List folders with creation dates
✅ Organize uploaded items within folders
✅ Search folders by name

5. Home Page API
✅ Show Total Storage Usage (Used & Remaining)
✅ Show Total Folders Created
✅ Show Total Notes, Images, and PDFs Uploaded
✅ Show Recent Added Items

6. Calendar Integration
✅ Show a calendar with created dates
✅ Clicking a date returns all items created on that specific day

7. User Profile Management
✅ Update Username
✅ Update Profile Picture

8. API Best Practices & Security
✅ Use MVC Architecture for clean and scalable code
✅ Use JWT Authentication for secured user access
✅ Middleware for File Validation & Storage Quota Management
✅ Use Multer for file uploads
✅ MongoDB Schema Design with relationships for users, folders, and files
