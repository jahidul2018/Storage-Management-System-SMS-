// // src/routes/passwordResetRoutes.js - Password Reset Routes
// const express = require('express');
// const { requestPasswordReset, verifyResetCode, resetPassword } = require('../controllers/passwordResetController');
// const router = express.Router();

// router.post('/request-reset', requestPasswordReset);
// router.post('/verify-code', verifyResetCode);
// router.post('/reset-password', resetPassword);

// module.exports = router;

const express = require('express');
const {
    requestPasswordReset,
    verifyResetCode,
    resetPassword
} = require('../controllers/passwordResetController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Password Reset
 *   description: Password reset and recovery routes
 */

/**
 * @swagger
 * /password/request-reset:
 *   post:
 *     summary: Request password reset
 *     tags: [Password Reset]
 *     description: Sends a password reset code to the user's email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset code sent successfully.
 *       404:
 *         description: User not found.
 */
router.post('/request-reset', requestPasswordReset);

/**
 * @swagger
 * /password/verify-code:
 *   post:
 *     summary: Verify reset code
 *     tags: [Password Reset]
 *     description: Verifies the reset code sent to the user's email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               resetCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset code verified successfully.
 *       400:
 *         description: Invalid or expired reset code.
 */
router.post('/verify-code', verifyResetCode);

/**
 * @swagger
 * /password/reset-password:
 *   post:
 *     summary: Reset password
 *     tags: [Password Reset]
 *     description: Resets the user password using the verified reset code.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               resetCode:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully.
 *       400:
 *         description: Invalid reset code or password format.
 */
router.post('/reset-password', resetPassword);

module.exports = router;
