/*
*
*   Request Schema middleware
*   Check body request schema
*
* */

import { requestBodySchemaInvalid } from '../response-errors.js';

export default function requestBodySchemaValidation(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const err = error.details[0];
      res.status(400);
      res.json(requestBodySchemaInvalid(err.path[0], err.message, err.context.value));
    } else {
      next();
    }
  };
}
