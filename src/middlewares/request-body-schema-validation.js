/**
 *
 *   Request body schema validation middleware
 *
 *   - Request body schema validation
 *
 * */

import { requestBodySchemaInvalid } from '../response-errors.js';

/**
 * Creates a middleware to verify if request body has the right schema
 * @param {joi.ObjectSchema<any>} schema - Schema to be validated
 * @return {function} - Middleware to validate the schema
 */
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
