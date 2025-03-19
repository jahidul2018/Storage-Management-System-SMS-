// // storageRoutes.js
// // src/routes/storageRoutes.js - Storage Routes
// const express = require('express');
// const { getStorageInfo } = require('../controllers/storageController');
// const { protect } = require('../middlewares/authMiddleware');
// const router = express.Router();

// router.get('/', protect, getStorageInfo);

// module.exports = router;

const express = require('express');
const { getStorageInfo } = require('../controllers/storageController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Storage
 *   description: API for managing and tracking storage usage
 */

/**
 * @swagger
 * /storage:
 *   get:
 *     summary: Get user storage information
 *     tags: [Storage]
 *     description: Retrieves the total, used, and remaining storage for the user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved storage information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalStorage:
 *                   type: string
 *                   example: "15 GB"
 *                 usedStorage:
 *                   type: string
 *                   example: "2.5 GB"
 *                 remainingStorage:
 *                   type: string
 *                   example: "12.5 GB"
 *       401:
 *         description: Unauthorized - User is not authenticated.
 */
router.get('/', protect, getStorageInfo);

module.exports = router;
