const express = require('express');
const { register, login } = require('../controllers/auth');
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validation');

const router = express.Router();

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('firstName').notEmpty().withMessage('First name is required').escape(),
    body('lastName').notEmpty().withMessage('Last name is required').escape(),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
], validateRequest, register);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required')
], validateRequest, login);

module.exports = router;