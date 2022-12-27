/**
 *
 *   Authentication Controller
 *
 *   - Authenticate user with email or username and assign access-token
 *
 */

import { signToken } from '../utils/jwtFunctions.js';
import { authenticate } from '../models/accounts.model.js';
import { serverError, requestBodySchemaInvalid } from '../response-errors.js';

/**
 * Authenticate user by email or username, check password match and assign access token
 */
export default async function auth(req, res) {
  const { clientIdentifier, clientSecret } = req.body;
  try {
    const data = await authenticate(clientIdentifier, clientSecret);
    const token = await signToken(data);
    res.json({ token });
  } catch (e) {
    if (e.name === 'ClientIdentifierNotFound') {
      res.status(400).json(requestBodySchemaInvalid('clientIdentifier', e.message, clientIdentifier));
    } else if (e.name === 'ClientSecretNotMatch') {
      res.status(400).json(requestBodySchemaInvalid('clientSecret', e.message, clientSecret));
    } else {
      res.status(500).json(serverError);
    }
  }
}
