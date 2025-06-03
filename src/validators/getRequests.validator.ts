import { param } from 'express-validator';

export const getRequestsValidator = [
  param('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage("Priority must be one of 'low', 'medium', or 'high'")
];
