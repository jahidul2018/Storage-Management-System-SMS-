const File = require('../models/File');
const Storage = require('../models/Storage');
const { updateStorageUsage } = require('../utils/storageUtils');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// File upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// ✅ Upload a file
const uploadFile = async (req, res) => {
    try {
        const { name, type, folderId } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const fileUrl = `/uploads/${req.file.filename}`;
        const fileSize = req.file.size;

        // Update storage usage
        await updateStorageUsage(req.user.id, fileSize);

        const file = new File({
            userId: req.user.id,
            folderId: folderId || null,
            name,
            type,
            url: fileUrl,
            size: fileSize,
        });

        await file.save();
        res.status(201).json({ success: true, message: 'File uploaded successfully', file });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// ✅ List all files with optional search
const listFiles = async (req, res) => {
    try {
        const searchQuery = req.query.search
            ? { userId: req.user.id, name: { $regex: req.query.search, $options: 'i' } }
            : { userId: req.user.id };

        const files = await File.find(searchQuery);
        res.status(200).json({ success: true, count: files.length, files });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// ✅ List images with optional search
const listImages = async (req, res) => {
    try {
        const searchQuery = req.query.search
            ? { userId: req.user.id, type: 'image', name: { $regex: req.query.search, $options: 'i' } }
            : { userId: req.user.id, type: 'image' };

        const images = await File.find(searchQuery);
        res.status(200).json({ success: true, count: images.length, images });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// ✅ List PDFs with optional search
const listPDFs = async (req, res) => {
    try {
        const searchQuery = req.query.search
            ? { userId: req.user.id, type: 'pdf', name: { $regex: req.query.search, $options: 'i' } }
            : { userId: req.user.id, type: 'pdf' };

        const pdfs = await File.find(searchQuery);
        res.status(200).json({ success: true, count: pdfs.length, pdfs });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// ✅ List Notes with optional search
const listNotes = async (req, res) => {
    try {
        const searchQuery = req.query.search
            ? { userId: req.user.id, type: 'note', name: { $regex: req.query.search, $options: 'i' } }
            : { userId: req.user.id, type: 'note' };

        const notes = await File.find(searchQuery);
        res.status(200).json({ success: true, count: notes.length, notes });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// ✅ Get a single file by ID
const getFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        res.status(200).json({ success: true, file });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// ✅ Update a file (rename)
const updateFile = async (req, res) => {
    try {
        const { name } = req.body;
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        file.name = name || file.name;
        await file.save();

        res.status(200).json({ success: true, message: 'File updated successfully', file });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// ✅ Delete a file
const deleteFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Remove file from disk
        const filePath = path.join(__dirname, `../../uploads/${file.url}`);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Update storage usage
        await updateStorageUsage(req.user.id, -file.size);

        // Delete file record
        await file.deleteOne();

        res.status(200).json({ success: true, message: 'File deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// ✅ Mark/Unmark file as favorite
const toggleFavorite = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        file.favorite = !file.favorite;
        await file.save();

        res.status(200).json({ success: true, message: 'Favorite status updated', file });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { 
    upload, 
    uploadFile, 
    listFiles, 
    listImages, 
    listPDFs, 
    listNotes, 
    getFile, 
    updateFile, 
    deleteFile, 
    toggleFavorite 
};
