/*
*
*   Authentication middleware
*   Middleware to verify access-token and validate access-token header in request
*
*   - Check access-token header present in request
*   - Verify access token
*
* */

import jsonwebtoken from 'jsonwebtoken';
import { noAccessToken, accessTokenInvalid } from '../response-errors.js';
import { JSONWEBTOKEN_KEY } from '../settings.js';

function authentication(req, res, next) {
  const accessToken = req.get('access-token');
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
