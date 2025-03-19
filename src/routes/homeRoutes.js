// // src/routes/homeRoutes.js - Home API Routes
// const express = require('express');
// const { getHomeData } = require('../controllers/homeController');
// const { protect } = require('../middlewares/authMiddleware');
// const router = express.Router();

// router.get('/', protect, getHomeData);

// module.exports = router;

const express = require('express');
const { getHomeData } = require('../controllers/homeController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Home
 *   description: Home API to get an overview of storage usage and recent activities
 */

/**
 * @swagger
 * /home:
 *   get:
 *     summary: Get home page data
 *     tags: [Home]
 *     description: Fetches storage usage, total files, folders, and recent items added by the user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved home data.
 *       401:
 *         description: Unauthorized - User is not authenticated.
 */
router.get('/', protect, getHomeData);

module.exports = router;
