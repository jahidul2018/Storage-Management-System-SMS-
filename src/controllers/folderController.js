// src/controllers/folderController.js - Folder CRUD Controller
const Folder = require('../models/Folder');
const File = require('../models/File');

// Create folder
const createFolder = async (req, res) => {
    try {
        const { name } = req.body;
        const folder = new Folder({ userId: req.user.id, name });
        await folder.save();
        res.status(201).json(folder);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// List folders
const listFolders = async (req, res) => {
    try {
        const folders = await Folder.find({ userId: req.user.id });
        res.json(folders);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get a single folder
const getFolder = async (req, res) => {
    try {
        const folder = await Folder.findById(req.params.id);
        if (!folder) return res.status(404).json({ message: 'Folder not found' });
        res.json(folder);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update a folder
const updateFolder = async (req, res) => {
    try {
        const { name } = req.body;
        const folder = await Folder.findById(req.params.id);
        if (!folder) return res.status(404).json({ message: 'Folder not found' });

        folder.name = name || folder.name;
        await folder.save();
        res.json(folder);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete a folder and its files
const deleteFolder = async (req, res) => {
    try {
        const folder = await Folder.findById(req.params.id);
        if (!folder) return res.status(404).json({ message: 'Folder not found' });

        await File.deleteMany({ folderId: folder._id });
        await Folder.deleteOne({ _id: folder._id });
        res.json({ message: 'Folder and its files deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { createFolder, listFolders, getFolder, updateFolder, deleteFolder };