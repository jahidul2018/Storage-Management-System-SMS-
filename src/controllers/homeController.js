// src/controllers/homeController.js - Home API Controller
const Storage = require('../models/Storage');
const File = require('../models/File');
const Folder = require('../models/Folder');

// Get home page data
const getHomeData = async (req, res) => {
    try {
        const storage = await Storage.findOne({ userId: req.user.id });
        const totalFolders = await Folder.countDocuments({ userId: req.user.id });
        const totalFiles = await File.countDocuments({ userId: req.user.id });
        const recentFiles = await File.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(5);

        const remainingStorage = storage.totalStorage - storage.usedStorage;

        res.json({
            totalStorage: storage.totalStorage,
            usedStorage: storage.usedStorage,
            remainingStorage,
            totalFolders,
            totalFiles,
            recentFiles,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getHomeData };
