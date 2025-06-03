import { body } from 'express-validator';

export const createRequestValidator = [
  body('tenantId')
    .notEmpty().withMessage('Tenant ID is required.')
    .isString().withMessage('Tenant ID must be a string.')
    .isLength({ max: 50 }).withMessage('Tenant ID must be at most 50 characters.'),

  body('message')
    .notEmpty().withMessage('Message is required.')
    .isString().withMessage('Message must be a string.')
    .isLength({ max: 500 }).withMessage('Message cannot exceed 500 characters.'),

  body('timestamp')
    .notEmpty().withMessage('Timestamp is required.')
    .isISO8601().withMessage('Timestamp must be a valid ISO8601 string.')
];