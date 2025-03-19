// // src/routes/calendarRoutes.js - Calendar API Routes
// const express = require('express');
// const { getItemsByDate } = require('../controllers/calendarController');
// const { protect } = require('../middlewares/authMiddleware');
// const router = express.Router();

// router.get('/:date', protect, getItemsByDate);

// module.exports = router;

const express = require('express');
const { getItemsByDate } = require('../controllers/calendarController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Calendar
 *   description: API to fetch items created on a specific date
 */

/**
 * @swagger
 * /calendar/{date}:
 *   get:
 *     summary: Get items created on a specific date
 *     tags: [Calendar]
 *     description: Retrieves files, notes, and folders created on a selected date.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The date in YYYY-MM-DD format.
 *     responses:
 *       200:
 *         description: Successfully retrieved items for the selected date.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 date:
 *                   type: string
 *                   example: "2024-03-15"
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       type:
 *                         type: string
 *                         example: "file | note | folder"
 *       400:
 *         description: Invalid date format.
 *       404:
 *         description: No items found for the given date.
 */
router.get('/:date', protect, getItemsByDate);

module.exports = router;
