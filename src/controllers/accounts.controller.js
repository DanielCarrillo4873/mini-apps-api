/*
*
*   Accounts Controllers
*   Function definitions for Account controllers
*
*   - Get an account by username
*   - Create an account
*   - Update an account by username
*   - Delete an account by username
*
* */

import { hash } from 'bcrypt';
import { serverError, requestBodySchemaInvalid, resourceNotFound } from '../response-errors.js';
import { SALTS } from '../settings.js';
import Account from '../models/account.model.js';

export async function getAccount(req, res) {
  try {
    const { username } = req.params;
    const account = await Account.getByUsername(username);
    if (account) res.json(account);
    else {
      res.status(404);
      res.json(resourceNotFound('account', 'username', username));
    }
  } catch {
    res.status(500);
    res.json(serverError);
  }
}

export async function createAccount(req, res) {
  try {
    req.body.password = await hash(req.body.password, SALTS);
    const account = new Account(req.body);
    await account.save();
    res.status(201);
    res.json({ ok: 1 });
  } catch (e) {
    if (e.code === 11000) {
      const { field, value } = Object.entries(e.keyValue)[0];
      res.status(400);
      res.json(requestBodySchemaInvalid(field, `${field} already exist`, value));
    } else {
      res.status(500);
      res.json(serverError);
    }
  }
}

export async function updateAccount(req, res) {
  try {
    const { username } = req.params;

  } catch {
    res.status(500);
    res.json(serverError);
  }
}

export async function deleteAccount(req, res) {
  try {
    const { username } = req.params;
    const results = await Account.deleteOne({ username });
    if (results.deletedCount === 1) res.json({ ok: 1 });
    else {
      res.status(404);
      res.json(resourceNotFound('account', 'username', username));
    }
  } catch {
    res.status(500);
    res.json(serverError);
  }
}
