/*
*
*   Auth
*   Authenticate users controller
*
*   - Authenticates a user by password and username or email
*   - Creates a valid token if password and username or email are valid
*   - Send valid token as json
*
* */

import jsonwebtoken from 'jsonwebtoken';
import mongoClient from '../database.js';
import { requestSchemaInvalid, serverError } from '../response-errors.js';
import { JSONWEBTOKEN_KEY } from '../settings.js';

const users = mongoClient.db('mini-apps').collection('user');

export default async function auth(req, res) {
  const { username, email } = req.body;
  try {
    const result = await users.findOne({
      $or: [{ username }, { email }],
    });
    if (result) {
      jsonwebtoken.sign(
        {
          user: {
            // eslint-disable-next-line no-underscore-dangle
            id: result._id,
            username: result.username,
            email: result.email,
            birthday: result.birthday,
          },
        },
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
      res.json(requestSchemaInvalid('username/email', 'Not found', username || email));
    }
  } catch {
    res.status(500);
    res.json(serverError);
  }
}
