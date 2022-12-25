/**
 *
 *  Accounts Model
 *
 *  - Get account by username
 *  - Create account
 *  - Update account by username
 *  - Delete account by username
 *
 */

/**
 * An account
 * @typedef  {object} Account
 * @property {String} id - Unique identifier provide by mongoDb
 * @property {String} username - Unique username
 * @property {String} email - Unique email
 * @property {String} name - User name
 * @property {String} firstLastname - First user lastname
 * @property {String} secondLastname - Second user lastname
 * @property {Date} birthday - User birthday date
 * @property {Date} creationDate - account creation date
 */

import { hash, compare } from 'bcrypt';
import { SALTS } from '../settings.js';
import mongoClient from '../database.js';

// Accounts collection
export const Accounts = mongoClient.db().collection('accounts');

/**
 * Get a user using unique username
 * @async
 * @param {String} username - Account associated username
 * @throws {Error} - username does not exist
 * @returns {Account} - Account information
 */
export async function getByUsername(username) {
  const [account] = await Accounts.aggregate([
    {
      $match: { username },
    },
    {
      $project: {
        _id: 0,
        id: { $toString: '$_id' },
        username: 1,
        email: 1,
        name: 1,
        firstLastname: 1,
        secondLastname: 1,
        birthday: 1,
      },
    },
  ]).toArray();
  if (!account) {
    const e = new Error();
    e.name = 'UsernameNotExist';
    throw e;
  } // Account not found
  return account;
}

/**
 * Store new account data with encrypt password
 * @async
 * @param {{
 *   username: String,
 *   email: String,
 *   password: String,
 *   name: String,
 *   firstLastname: String,
 *   secondLastname?: String,
 *   birthday: Date,
 * }} data - Account information to create a new one
 * @returns {Promise<String>} - Account id
 */
export async function createAccount(data) {
  const hashedPassword = await hash(data.password, SALTS); // Encrypt password

  const newAccount = {
    username: data.username,
    email: data.email,
    password: hashedPassword,
    name: data.name,
    firstLastname: data.firstLastname,
    secondLastname: data.secondLastname || null,
    birthday: data.birthday,
    creationDate: new Date(),
  };

  try {
    const res = await Accounts.insertOne(newAccount);
    return res.insertedId.toString();
  } catch (e) {
    if (e.code === 11000) {
      const [key, value] = Object.entries(e.keyValue);
      const error = new Error(`${key} already exist.`);
      error.name = 'IdentifierAlreadyExist';
      error.key = key;
      error.value = value;
      throw error;
    } else {
      throw e;
    }
  }
}

/**
 * Updates account information
 * @async
 * @param {String} username - username to update data
 * @param {{
 *   name?: String,
 *   firstLastname?: String,
 *   secondLastname?: String,
 * }} data - Data to update account information
 * @throws {Error} - Username does not exist
 * @returns {Account} - Account information updated
 */
export async function updateAccount(username, data) {
  const res = await Accounts.updateOne({ username }, { $set: data });
  if (res.matchedCount === 0) {
    const e = new Error();
    e.name = 'UsernameNot exist';
    throw e;
  }
  return getByUsername(username);
}

/**
 * Deletes an account by username
 * @async
 * @param {String} username - Username to delete account
 * @throws {Error} Username does not exist
 */
export async function deleteAccount(username) {
  const res = await Accounts.deleteOne({ username });
  if (res.deletedCount === 0) {
    const e = new Error();
    e.name = 'UsernameNotExist';
    throw e;
  }
}

/**
 * Authenticates a user
 * @async
 * @param {String} clientIdentifier - Email o username to identify an account
 * @param {String} clientSecret - Password to authenticate user
 * @throws {Error} clientIdentifier not found
 * @throws {Error} clientSecret not math
 */
export async function authenticate(clientIdentifier, clientSecret) {
  const account = await Accounts.findOne({
    $or: [{ username: clientIdentifier }, { email: clientIdentifier }],
  });

  if (!account) {
    const e = new Error('Client identifier not found');
    e.name = 'ClientIdentifierNotFound';
    throw e;
  }

  const match = await compare(clientSecret, account.password);
  if (!match) {
    const e = new Error('Client secret not match');
    e.name = 'ClientSecretNotMatch';
    throw e;
  }

  account.id = account._id;
  delete account._id;
  delete account.password;
  return account;
}
