/*
*
*   Request Schema middleware
*   Check body request schema
*
* */

import { requestSchemaInvalid } from '../response-errors.js';

export default function requestSchemaValidation(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const err = error.details[0];
      res.status(400);
      res.json(requestSchemaInvalid(err.path[0], err.message, err.context.value));
    } else {
      next();
    }
  };
}
