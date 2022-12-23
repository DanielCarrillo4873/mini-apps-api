/*
*
*   Users Controllers
*   Function definitions for users controllers
*
*   - Get a user by user
*   - Create a user
*   - Update one user
*   - Delete one user by username
*
* */

import { hash } from 'bcrypt';
import database from '../database.js';
import { serverError, requestBodySchemaInvalid, resourceNotFound } from '../response-errors.js';
import { SALTS } from '../settings.js';

const user = database.db('mini-apps').collection('user');

export async function getUser(req, res) {
  try {
    const { username } = req.params;
    const u = await user.findOne({ username }, { projection: { password: 0 } });
    if (u) {
      res.status(200);
      res.json(u);
    } else {
      res.status(404);
      res.json(resourceNotFound('user', 'username', username));
    }
  } catch {
    res.status(500);
    res.json(serverError);
  }
}

export async function createUser(req, res) {
  try {
    let newUser = req.body;
    const validUsername = await user.findOne({ username: newUser.username });
    const validEmail = await user.findOne({ email: newUser.email });
    if (validUsername) {
      res.status(400);
      res.json(requestBodySchemaInvalid('username', 'Username already exist', newUser.username));
    } else if (validEmail) {
      res.status(400);
      res.json(requestBodySchemaInvalid('email', 'Email already exist', newUser.email));
    } else {
      newUser.password = await hash(newUser.password, SALTS);
      const result = await user.insertOne(newUser);
      newUser = await user.findOne(
        { _id: result.insertedId },
        { projection: { password: 0 } },
      );
      res.status(201);
      res.json(newUser);
    }
  } catch {
    res.status(500);
    res.json(serverError);
  }
}

export async function updateUser(req, res) {
  try {
    const u = await user.findOne({ username: req.params.username });
    if (u) {
      const { username, email } = req.body;
      const validUsername = await user.findOne({ username });
      const validEmail = await user.findOne({ email });
      if (validUsername) {
        res.status(400);
        res.json(requestBodySchemaInvalid('username', 'Username already exists.', username));
      } else if (validEmail) {
        res.status(400);
        res.json(requestBodySchemaInvalid('email', 'Email already exist.', email));
      } else {
        await user.updateOne({ username: req.params.username }, { $set: req.body });
        res.json({ ok: 1 });
      }
    } else {
      res.status(400);
      res.json(requestBodySchemaInvalid('username', 'Username does not exist.', req.params.username));
    }
  } catch {
    res.status(500);
    res.json(serverError);
  }
}

export async function deleteUser(req, res) {
  try {
    const { username } = req.params;
    const deleted = await user.findOne({ username });
    const result = await user.deleteOne({ username });
    if (result.deletedCount) {
      res.status(200);
      res.json(deleted);
    } else {
      res.status(404);
      res.json(resourceNotFound('user', 'username', username));
    }
  } catch {
    res.status(500);
    res.json(serverError);
  }
}
