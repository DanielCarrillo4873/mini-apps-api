/**
*
*   Request body schemas for accounts
*
* */

import joi from 'joi';

// Schema to create a new Account
export const newAccountRequestSchema = joi.object({
  email: joi.string().required().email(),
  username: joi.string().min(6).required(),
  password: joi.string().required().min(6),
  name: joi.string().required(),
  firstLastname: joi.string().required(),
  secondLastname: joi.string(),
  birthday: joi.date().required(),
});

// Schema to update a user
export const updateAccountRequestSchema = joi.object({
  name: joi.string(),
  firstLastname: joi.string(),
  secondLastname: joi.string(),
}).or('name', 'firstLastname', 'secondLastname');

// Schema to authenticate a user
export const authenticateUserSchema = joi.object({
  clientIdentifier: joi.string().required(),
  clientSecret: joi.string().min(6).required(),
});
