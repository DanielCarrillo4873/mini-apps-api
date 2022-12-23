/*
*
*   Request body schemas for accounts
*
* */

import joi from 'joi';

// Schema to create a new user
export const newAccountRequestSchema = joi.object({
  email: joi.string().required().email(),
  username: joi.string().required(),
  password: joi.string().required().min(6),
  birthday: joi.date().required(),
});

// Schema to update a user
export const updateAccountRequestSchema = joi.object({
  email: joi.string().email(),
  username: joi.string(),
}).or('email', 'username');

// Schema to authenticate a user
export const authenticateUserSchema = joi.object({
  clientIdentifier: joi.string().required(),
  clientSecret: joi.string().min(6).required(),
});
