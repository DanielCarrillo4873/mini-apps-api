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

import { hash } from 'bcrypt';
import { SALTS } from '../settings.js';
import mongoClient from '../database.js';

// Accounts collection
export const Accounts = mongoClient.db().collection('accounts');

/**
 * Get a user using unique username
 * @async
 * @param {String} username - Account associated username
 * @throws {TypeError} - username does not exist
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
  if (!account) throw new TypeError(); // Account not found
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
  const res = await Accounts.insertOne({
    username: data.username,
    email: data.email,
    password: hashedPassword,
    name: data.name,
    firstLastname: data.firstLastname,
    secondLastname: data.secondLastname || null,
    birthday: data.birthday,
    creationDate: new Date(),
  });
  return res.insertedId.toString();
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
 * @throws {TypeError} - Username does not exist
 * @returns {Account} - Account information updated
 */
export async function updateAccount(username, data) {
  const res = await Accounts.updateOne({ username }, { $set: data });
  if (res.matchedCount === 0) throw new TypeError();
  return getByUsername(username);
}

/**
 * Deletes an account by username
 * @async
 * @param {String} username - Username to delete account
 * @throws {TypeError} Username does not exist
 */
export async function deleteAccount(username) {
  const res = await Accounts.deleteOne({ username });
  if (res.deletedCount === 0) throw new TypeError();
}
