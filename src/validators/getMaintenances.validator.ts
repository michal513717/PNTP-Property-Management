import { query } from 'express-validator';

export const getMaintanacesValidator = [
  query('priority')
    .isIn(['low', 'medium', 'high', 'LOW', 'MEDIUM', 'HIGH'])
    .withMessage("Priority must be one of 'low', 'medium', or 'high'")
];
