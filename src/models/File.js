// src/models/File.js - File Model
const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    folderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', default: null },
    name: { type: String, required: true },
    type: { type: String, enum: ['image', 'pdf', 'note'], required: true },
    url: { type: String, required: true },
    size: { type: Number, required: true },
    favorite: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('File', FileSchema);