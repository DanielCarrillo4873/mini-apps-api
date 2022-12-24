/**
 *
 *   Accounts Controllers
 *
 *   - Get an account by username
 *   - Create an account
 *   - Update an account by username
 *   - Delete an account by username
 *
 * */

import { serverError, requestBodySchemaInvalid, resourceNotFound } from '../response-errors.js';
import {
  createAccount, deleteAccount, getByUsername, updateAccount,
} from '../models/accounts.model.js';

/**
 * Get and account by username
 */
export async function getAccountController(req, res) {
  const { username } = req.params;
  try {
    const account = await getByUsername(username);
    res.json(account);
  } catch (e) {
    if (e instanceof TypeError) {
      res.status(400);
      res.json(resourceNotFound('accounts', 'username', username));
    } else {
      res.status(500);
      res.json(serverError);
    }
  }
}

/**
 * Create an account,
 */
export async function createAccountController(req, res) {
  try {
    const data = req.body;
    const id = await createAccount(data);
    res.status(201);
    res.json({ id });
  } catch ({ code, keyValue }) {
    if (code === 11000) { // MongoServerError, keys is not unique
      const [field, value] = Object.entries(keyValue)[0];
      res.status(400);
      res.json(requestBodySchemaInvalid(field, `${field} already exist.`, value));
    } else {
      res.status(500);
      res.json(serverError);
    }
  }
}

/**
 * Update not sensible account information
 */
export async function updateAccountController(req, res) {
  const { username } = req.params;
  const data = req.body;
  try {
    const updated = await updateAccount(username, data);
    res.json(updated);
  } catch (e) {
    if (e instanceof TypeError) { // Username not exist
      res.status(400);
      res.json(resourceNotFound('account', 'username', username));
    } else {
      res.status(500);
      res.json(serverError);
    }
  }
}

/**
 * Delete an account by username
 */
export async function deleteAccountController(req, res) {
  const { username } = req.params;
  try {
    await deleteAccount(username);
    res.json({ ok: 1 });
  } catch (e) {
    if (e instanceof TypeError) { // Username not exist
      res.status(400);
      res.json(resourceNotFound('accounts', 'username', username));
    } else {
      res.status(500);
      res.json(serverError);
    }
  }
}
