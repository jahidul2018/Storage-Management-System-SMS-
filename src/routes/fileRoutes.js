const express = require('express');
const {
    upload,
    uploadFile,
    listFiles,
    listImages,
    listPDFs,
    listNotes,
    getFile,
    updateFile,
    deleteFile,
    toggleFavorite
} = require('../controllers/fileController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Files
 *   description: File management routes
 */

/**
 * @swagger
 * /files/upload:
 *   post:
 *     summary: Upload a file
 *     tags: [Files]
 *     description: Uploads an image, PDF, or note file.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [image, pdf, note]
 *               folderId:
 *                 type: string
 *     responses:
 *       201:
 *         description: File uploaded successfully.
 */
router.post('/upload', protect, upload.single('file'), uploadFile);

/**
 * @swagger
 * /files/all:
 *   get:
 *     summary: Get all files
 *     tags: [Files]
 *     description: Fetches all files uploaded by the user with optional search.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by file name.
 *     responses:
 *       200:
 *         description: Successfully retrieved all files.
 */
router.get('/all', protect, listFiles);

/**
 * @swagger
 * /files/images:
 *   get:
 *     summary: Get all images
 *     tags: [Files]
 *     description: Fetches only image files uploaded by the user with optional search.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by image file name.
 *     responses:
 *       200:
 *         description: Successfully retrieved image files.
 */
router.get('/images', protect, listImages);

/**
 * @swagger
 * /files/pdfs:
 *   get:
 *     summary: Get all PDFs
 *     tags: [Files]
 *     description: Fetches only PDF files uploaded by the user with optional search.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by PDF file name.
 *     responses:
 *       200:
 *         description: Successfully retrieved PDF files.
 */
router.get('/pdfs', protect, listPDFs);

/**
 * @swagger
 * /files/notes:
 *   get:
 *     summary: Get all notes
 *     tags: [Files]
 *     description: Fetches only note files uploaded by the user with optional search.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by note file name.
 *     responses:
 *       200:
 *         description: Successfully retrieved note files.
 */
router.get('/notes', protect, listNotes);

/**
 * @swagger
 * /files/{id}:
 *   get:
 *     summary: Get a single file
 *     tags: [Files]
 *     description: Fetches details of a specific file by ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: File ID.
 *     responses:
 *       200:
 *         description: Successfully retrieved file details.
 *       404:
 *         description: File not found.
 */
router.get('/:id', protect, getFile);

/**
 * @swagger
 * /files/{id}:
 *   put:
 *     summary: Update file name
 *     tags: [Files]
 *     description: Updates the name of an existing file.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: File ID.
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
 *         description: File name updated successfully.
 *       404:
 *         description: File not found.
 */
router.put('/:id', protect, updateFile);

/**
 * @swagger
 * /files/{id}:
 *   delete:
 *     summary: Delete a file
 *     tags: [Files]
 *     description: Deletes a file permanently.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: File ID.
 *     responses:
 *       200:
 *         description: File deleted successfully.
 *       404:
 *         description: File not found.
 */
router.delete('/:id', protect, deleteFile);

/**
 * @swagger
 * /files/favorite/{id}:
 *   put:
 *     summary: Toggle file favorite status
 *     tags: [Files]
 *     description: Marks or unmarks a file as favorite.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: File ID.
 *     responses:
 *       200:
 *         description: Favorite status updated successfully.
 *       404:
 *         description: File not found.
 */
router.put('/favorite/:id', protect, toggleFavorite);

module.exports = router;
