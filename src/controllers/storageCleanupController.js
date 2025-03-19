// src/controllers/storageCleanupController.js - Storage Cleanup Controller
const { deleteFile } = require('../utils/storageUtils');

// Delete a file API
const deleteFileAPI = async (req, res) => {
    try {
        const { fileId } = req.params;
        await deleteFile(fileId, req.user.id);
        res.json({ message: 'File deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting file' });
    }
};

module.exports = { deleteFileAPI };
