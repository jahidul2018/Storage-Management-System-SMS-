// src/controllers/storageController.js - Storage Controller
const Storage = require('../models/Storage');
const User = require('../models/User');

// Get user storage details
const getStorageInfo = async (req, res) => {
    try {
        const storage = await Storage.findOne({ userId: req.user.id });
        if (!storage) return res.status(404).json({ message: 'Storage not found' });

        const remainingStorage = storage.totalStorage - storage.usedStorage;
        res.json({ totalStorage: storage.totalStorage, usedStorage: storage.usedStorage, remainingStorage });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update storage usage
const updateStorageUsage = async (userId, fileSize) => {
    try {
        let storage = await Storage.findOne({ userId });
        if (!storage) {
            storage = new Storage({ userId });
        }

        if (storage.usedStorage + fileSize > storage.totalStorage) {
            throw new Error('Storage limit exceeded');
        }

        storage.usedStorage += fileSize;
        await storage.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { getStorageInfo, updateStorageUsage };
