const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { protect, sensitiveOperationLimit } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('phone')
    .matches(/^\+?[\d\s\-()]{10,}$/)
    .withMessage('Please provide a valid phone number'),
  body('userType')
    .isIn(['patient', 'doctor'])
    .withMessage('User type must be either patient or doctor')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const forgotPasswordValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email')
];

const resetPasswordValidation = [
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
];

// Routes
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, sensitiveOperationLimit(5, 15 * 60 * 1000), authController.login);
router.post('/social-login', authController.socialLogin);
router.get('/verify-email/:token', authController.verifyEmail);
router.post('/forgot-password', forgotPasswordValidation, sensitiveOperationLimit(3, 15 * 60 * 1000), authController.forgotPassword);
router.patch('/reset-password/:token', resetPasswordValidation, authController.resetPassword);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', protect, authController.logout);

module.exports = router;