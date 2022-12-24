/**
 *
 *   Authentication middleware
 *
 *   - Authentication
 *
 */

import jsonwebtoken from 'jsonwebtoken';
import { noAccessToken, accessTokenInvalid } from '../response-errors.js';
import { JSONWEBTOKEN_KEY } from '../settings.js';

function authentication(req, res, next) {
  const accessToken = req.get('authorization');
  if (accessToken) {
    jsonwebtoken.verify(accessToken, JSONWEBTOKEN_KEY, {}, (err, decoded) => {
      if (err) {
        res.status(400);
        res.json(accessTokenInvalid(accessToken));
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(400);
    res.json(noAccessToken);
  }
}

export default authentication;
