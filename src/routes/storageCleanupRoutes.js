// // src/routes/storageCleanupRoutes.js - Storage Cleanup Routes
// const express = require('express');
// const { deleteFileAPI } = require('../controllers/storageCleanupController');
// const { protect } = require('../middlewares/authMiddleware');
// const router = express.Router();

// router.delete('/delete/:fileId', protect, deleteFileAPI);

// module.exports = router;

const express = require('express');
const { deleteFileAPI } = require('../controllers/storageCleanupController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Storage Cleanup
 *   description: API for deleting files and managing storage
 */

/**
 * @swagger
 * /cleanup/delete/{fileId}:
 *   delete:
 *     summary: Delete a file
 *     tags: [Storage Cleanup]
 *     description: Permanently deletes a file and updates storage usage.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fileId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the file to be deleted.
 *     responses:
 *       200:
 *         description: File deleted successfully.
 *       404:
 *         description: File not found.
 */
router.delete('/delete/:fileId', protect, deleteFileAPI);

module.exports = router;
