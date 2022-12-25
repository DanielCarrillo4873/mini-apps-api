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
    if (e.name === 'UsernameNotExist') {
      res.status(400).json(resourceNotFound('accounts', 'username', username));
    } else {
      res.status(500).json(serverError);
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
    res.status(201).json({ id });
  } catch (e) {
    if (e.name === 'IdentifierAlreadyExist') {
      res.status(400).json(requestBodySchemaInvalid(e.key, e.message, e.value));
    } else {
      res.status(500).json(serverError);
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
    if (e.name === 'UsernameNotExist') {
      res.status(400).json(resourceNotFound('account', 'username', username));
    } else {
      res.status(500).json(serverError);
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
    if (e.name === 'UsernameNotExist') {
      res.status(400).json(resourceNotFound('accounts', 'username', username));
    } else {
      res.status(500).json(serverError);
    }
  }
}
