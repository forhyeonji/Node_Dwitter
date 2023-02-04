import express from 'express';
import {} from 'express-async-errors';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/auth.js';
import { body } from 'express-validator';
import * as authController from '../controller/auth.js';

const router = express.Router();

const validateCredential = [
  body('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage('username should be at least 5 characters'),
  body('password')
    .trim()
    .isLength({ min: 3 })
    .withMessage('username should be at least 5 characters'),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body('name').notEmpty().withMessage('name is missing'),
  body('email').isEmail().normalizeEmail().withMessage('invalid email'),
  body('url')
    .isURL()
    .withMessage('invalid URL')
    .optional({ nullable: true, checkFalsy: true }),
  validate,
];

router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateCredential, authController.login);
router.post('/logout', authController.logout);
router.get('/me', isAuth, authController.me);

export default router;
