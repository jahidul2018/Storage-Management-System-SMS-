// src/controllers/passwordResetController.js - Password Reset Controller
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

// Generate a random 6-digit code
const generateResetCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// Store reset codes temporarily
const resetCodes = new Map();

// Send reset code via email
const sendResetCode = async (email, code) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email provider
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Code',
        text: `Your password reset code is: ${code}`
    });
};

// Request password reset (send verification code)
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const code = generateResetCode();
        resetCodes.set(email, code);

        await sendResetCode(email, code);
        res.json({ message: 'Reset code sent to email' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Verify reset code
const verifyResetCode = async (req, res) => {
    const { email, code } = req.body;
    if (resetCodes.get(email) === code) {
        res.json({ message: 'Code verified' });
    } else {
        res.status(400).json({ message: 'Invalid or expired code' });
    }
};

// Reset password
const resetPassword = async (req, res) => {
    const { email, code, newPassword } = req.body;
    if (resetCodes.get(email) !== code) return res.status(400).json({ message: 'Invalid or expired code' });

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        resetCodes.delete(email);
        res.json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { requestPasswordReset, verifyResetCode, resetPassword };
