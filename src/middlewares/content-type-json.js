/*
*
*   Content type json
*   Middleware to test content type to be json
*
*   - Check content type for request to be json
*
* */

import { contentTypeNotJson } from '../response-errors.js';

export default function contentTypeJson(req, res, next) {
  if (req.get('Content-Type') === 'application/json') {
    next();
  } else {
    res.status(400);
    res.json(contentTypeNotJson(req.get('Content-Type')));
  }
}