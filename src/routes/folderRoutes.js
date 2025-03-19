// // src/routes/folderRoutes.js - Folder Routes
// const express = require('express');
// const { createFolder, listFolders, getFolder, updateFolder, deleteFolder } = require('../controllers/folderController');
// const { protect } = require('../middlewares/authMiddleware');
// const router = express.Router();

// router.post('/create', protect, createFolder);
// router.get('/', protect, listFolders);
// router.get('/:id', protect, getFolder);
// router.put('/:id', protect, updateFolder);
// router.delete('/:id', protect, deleteFolder);

// module.exports = router;

const express = require('express');
const {
    createFolder,
    listFolders,
    getFolder,
    updateFolder,
    deleteFolder
} = require('../controllers/folderController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Folders
 *   description: Folder management routes
 */

/**
 * @swagger
 * /folders/create:
 *   post:
 *     summary: Create a new folder
 *     tags: [Folders]
 *     description: Creates a new folder for organizing files.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               parentFolderId:
 *                 type: string
 *                 description: (Optional) ID of the parent folder.
 *     responses:
 *       201:
 *         description: Folder created successfully.
 *       400:
 *         description: Invalid request.
 */
router.post('/create', protect, createFolder);

/**
 * @swagger
 * /folders:
 *   get:
 *     summary: Get all folders
 *     tags: [Folders]
 *     description: Fetches all folders created by the user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved folders.
 */
router.get('/', protect, listFolders);

/**
 * @swagger
 * /folders/{id}:
 *   get:
 *     summary: Get a single folder
 *     tags: [Folders]
 *     description: Fetches details of a specific folder by ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Folder ID.
 *     responses:
 *       200:
 *         description: Successfully retrieved folder details.
 *       404:
 *         description: Folder not found.
 */
router.get('/:id', protect, getFolder);

/**
 * @swagger
 * /folders/{id}:
 *   put:
 *     summary: Update folder name
 *     tags: [Folders]
 *     description: Updates the name of an existing folder.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Folder ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Folder name updated successfully.
 *       404:
 *         description: Folder not found.
 */
router.put('/:id', protect, updateFolder);

/**
 * @swagger
 * /folders/{id}:
 *   delete:
 *     summary: Delete a folder
 *     tags: [Folders]
 *     description: Deletes a folder and all its contents.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Folder ID.
 *     responses:
 *       200:
 *         description: Folder deleted successfully.
 *       404:
 *         description: Folder not found.
 */
router.delete('/:id', protect, deleteFolder);

module.exports = router;
