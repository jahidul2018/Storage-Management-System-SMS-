// src/controllers/calendarController.js - Calendar API Controller
const File = require('../models/File');
const Folder = require('../models/Folder');

// Get items created on a specific date
const getItemsByDate = async (req, res) => {
    try {
        const { date } = req.params;
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        const files = await File.find({
            userId: req.user.id,
            createdAt: { $gte: startDate, $lte: endDate }
        });

        const folders = await Folder.find({
            userId: req.user.id,
            createdAt: { $gte: startDate, $lte: endDate }
        });

        res.json({ date, files, folders });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getItemsByDate };
