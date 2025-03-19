// src/models/Storage.js - Storage Model
const mongoose = require('mongoose');

const StorageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalStorage: { type: Number, default: 15 * 1024 * 1024 * 1024 }, // 15GB in bytes
    usedStorage: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Storage', StorageSchema);