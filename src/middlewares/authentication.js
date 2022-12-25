/**
 *
 *   Authentication middleware
 *
 *   - Authentication
 *
 */

import { noAccessToken, accessTokenInvalid } from '../response-errors.js';
import { verifyToken } from '../utils/jwtFunctions.js';

/**
 * Verify authorization header is present and access token validity
 */
async function authentication(req, res, next) {
  const accessToken = req.get('authorization');
  if (accessToken) {
    try {
      req.decoded = await verifyToken(accessToken);
      next();
    } catch {
      res.status(401).json(accessTokenInvalid(accessToken));
    }
  } else {
    res.status(400);
    res.json(noAccessToken);
  }
}

export default authentication;
