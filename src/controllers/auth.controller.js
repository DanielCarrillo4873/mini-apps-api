/**
 *
 *   Authentication Controller
 *
 *   - Authenticate user with email or username and assign access-token
 *
 */

import jsonwebtoken from 'jsonwebtoken';
import { compare } from 'bcrypt';
import mongoClient from '../database.js';
import { requestBodySchemaInvalid, serverError } from '../response-errors.js';
import { JSONWEBTOKEN_KEY } from '../settings.js';

const users = mongoClient.db('mini-apps').collection('user');

export default async function auth(req, res) {
  const { clientIdentifier, clientSecret } = req.body;
  try {
    const result = await users.findOne({
      $or: [{ username: clientIdentifier }, { email: clientIdentifier }],
    });

    if (result) {
      const match = await compare(clientSecret, result.password);
      if (match) {
        const user = {
          // eslint-disable-next-line no-underscore-dangle
          id: result._id,
          username: result.username,
          email: result.email,
          birthday: result.birthday,
        };
        jsonwebtoken.sign(
          user,
          JSONWEBTOKEN_KEY,
          { algorithm: 'HS256' },
          (err, token) => {
            if (err) {
              res.status(500);
              res.json(serverError);
            } else {
              res.json({ token });
            }
          },
        );
      } else {
        res.status(400);
        res.json(requestBodySchemaInvalid('clientSecret', 'client Secret not valid'));
      }
    } else {
      res.status(400);
      res.json(requestBodySchemaInvalid('username/email', 'Not found', clientIdentifier));
    }
  } catch {
    res.status(500);
    res.json(serverError);
  }
}
