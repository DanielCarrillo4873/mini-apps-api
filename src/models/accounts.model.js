/**
 *
 *  Accounts Model
 *
 *  - Username not exist - error class
 *  - Identifier not unique - error class
 *  - ClientIdentifier not found - error class
 *  - ClientSecret not match - error class
 *  - Get account by username
 *  - Create account
 *  - Update account by username
 *  - Delete account by username
 *
 */

import { hash, compare } from 'bcrypt';
import { SALTS } from '../settings.js';
import mongoClient from '../database.js';

// Accounts collection
export const Accounts = mongoClient.db().collection('accounts');

// ********** Data definition **********
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

// ********** Error classes **********
/**
 * Username not found error
 * @extends Error
 * @property {String} value - username value
 */
class UsernameNotFound extends Error {
  /**
   * @constructor
   * @param {String} username - Username that not exist
   */
  constructor(username) {
    super('Username already exist');
    this.name = 'UsernameNotFound';
    this.value = username;
  }
}

/**
 * Identifier not unique Error
 * @extends Error
 * @property {String} identifier - identifier that is not unique
 * @property {String} value - Value of not unique identifier
 */
class IdentifierNotUnique extends Error {
  /**
   * @constructor
   * @param {String} identifier - Identifier not unique
   * @param {String} value - Value of not unique identifier
   */
  constructor(identifier, value) {
    super(`${identifier} already exist`);
    this.name = 'IdentifierAlreadyExist';
    this.identifier = identifier;
    this.value = value;
  }
}

/**
 * Client identifier not found
 * @extends Error
 * @property {String} value - Value of not found ClientIdentifier
 */
class ClientIdentifierNotFound extends Error {
  /**
   * @constructor
   * @param {String} clientIdentifier - ClientIdentifier not found
   */
  constructor(clientIdentifier) {
    super('Client Identifier not found');
    this.name = 'ClientIdentifierNotFound';
    this.value = clientIdentifier;
  }
}

/**
 * Clint secret not match error
 */
class ClientSecretNotMach extends Error {
  /**
   * @constructor
   */
  constructor() {
    super('Client secret not match');
    this.name = 'ClientSecretNotMatch';
  }
}

// ********** Controller functions **********
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
  if (!account) throw new UsernameNotFound(username);
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
  // Check username and email to be unique
  const checkUnique = await checkUniqueIdentifier(data.username, data.email);
  if (checkUnique.username) throw new IdentifierNotUnique('username', data.username);
  if (checkUnique.email) throw new IdentifierNotUnique('Email', data.email);

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
  return res.insertedId;
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
  if (res.matchedCount === 0) throw new UsernameNotFound(username);
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
  if (res.deletedCount === 0) throw new UsernameNotFound(username);
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
  if (!account) throw new ClientIdentifierNotFound(clientIdentifier);

  const match = await compare(clientSecret, account.password);
  if (!match) throw new ClientSecretNotMach();

  account.id = account._id;
  delete account._id;
  delete account.password;
  return account;
}

// ********** Aux functions **********
/**
 * Check uniqueness of username and email
 * @async
 * @param {String} username - username to check
 * @param {String} email - email to check
 * @returns {Promise<Document>}
 */
async function checkUniqueIdentifier(username, email) {
  const [res] = await Accounts.aggregate([
    {
      $facet: {
        email: [
          { $match: { email } },
          { $count: 'count' },
        ],
        username: [
          { $match: { username } },
          { $count: 'count' },
        ],
      },
    },
    {
      $project: {
        email: { $getField: { field: 'count', input: { $first: '$email' } } },
        username: { $getField: { field: 'count', input: { $first: '$username' } } },
      },
    },
  ]).toArray();
  return res;
}
