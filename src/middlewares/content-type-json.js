/**
 *
 *   Content type json middleware
 *
 *   - Content type JSON
 *
 */

import { contentTypeNotJson } from '../response-errors.js';

/**
 * Verify if Content-Type exists and if is application/json
 */
export default function contentTypeJson(req, res, next) {
  if (req.get('Content-Type') === 'application/json') {
    next();
  } else {
    res.status(400);
    res.json(contentTypeNotJson(req.get('Content-Type')));
  }
}
