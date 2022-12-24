/**
 *
 *   Accounts request body schemas
 *
 *   - New Account
 *   - Update account
 *   - Auth user
 *
 */

import joi from 'joi';

/**
 * Schema for data to create a new account
 * @typedef {Object} newAccountRequestSchema
 * @property {String} email - Account email
 * @property {String} username - Account username
 * @property {String} password - Account password no encryption
 * @property {String} name - Account user real name
 * @property {String} firstLastname - Account user first lastname
 * @property {String} [secondLastname] - Account user second lastname if needed
 * @property {String} birthday - Account user birthdate
 */

/**
 * New accounts request schema joi object
 * @type {joi.ObjectSchema<newAccountRequestSchema>}
 * @constant
 */
export const newAccountRequestSchema = joi.object({
  email: joi.string().required().email(),
  username: joi.string().min(6).required(),
  password: joi.string().required().min(6),
  name: joi.string().required(),
  firstLastname: joi.string().required(),
  secondLastname: joi.string(),
  birthday: joi.date().required(),
});

/**
 * Schema to update non-sensitive and allowed account information
 * @typedef {Object} updateAccountRequestSchema
 * @property {String} [name] - New account user real name
 * @property {String} [firstLastname] - New account user first lastname
 * @property {String} [secondLastname] - New account user second lastname
 */

/**
 * Update account request schema joi object
 * @type {joi.ObjectSchema<updateAccountRequestSchema>}
 * @constant
 */
export const updateAccountRequestSchema = joi.object({
  name: joi.string(),
  firstLastname: joi.string(),
  secondLastname: joi.string(),
}).or('name', 'firstLastname', 'secondLastname');

/**
 * Schema to authenticate an account
 * @typedef authenticateUserSchema
 * @property {String} clientIdentifier - username o email associated with an account
 * @property {String} clientSecret - password to authenticate user
 */

/**
 * Authenticate user request schema joi object
 * @type {joi.ObjectSchema<authenticateUserSchema>}
 * @constant
 */
export const authenticateUserSchema = joi.object({
  clientIdentifier: joi.string().required(),
  clientSecret: joi.string().min(6).required(),
});
