import { body } from 'express-validator';

export const analyzeMessageValidator = [
  body('message')
    .notEmpty().withMessage('Message is required.')
    .isString().withMessage('Message must be a string.')
    .isLength({ max: 500 }).withMessage('Message cannot exceed 500 characters.')
];