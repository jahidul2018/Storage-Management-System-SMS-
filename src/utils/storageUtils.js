// src/utils/storageUtils.js - Storage Optimization Utilities
const Storage = require('../models/Storage');
const File = require('../models/File');
const fs = require('fs');
const path = require('path');

// Function to recalculate storage usage
const recalculateStorage = async (userId) => {
    try {
        const userFiles = await File.find({ userId });
        const totalUsed = userFiles.reduce((acc, file) => acc + file.size, 0);

        await Storage.findOneAndUpdate(
            { userId },
            { usedStorage: totalUsed },
            { new: true }
        );
    } catch (error) {
        console.error('Error recalculating storage:', error);
    }
};

// Function to delete a file
const deleteFile = async (fileId, userId) => {
    try {
        const file = await File.findById(fileId);
        if (!file) throw new Error('File not found');

        fs.unlinkSync(path.join(__dirname, `../../uploads/${file.url}`));
        await File.deleteOne({ _id: fileId });
        await recalculateStorage(userId);
    } catch (error) {
        console.error('Error deleting file:', error);
    }
};

module.exports = { recalculateStorage, deleteFile };