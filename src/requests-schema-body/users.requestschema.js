/*
*
*   New User Request Schema
*
* */

import joi from 'joi';

// Schema to create a new user
export const newUserRequestSchema = joi.object({
  email: joi.string().required().email(),
  username: joi.string().required(),
  password: joi.string().required().min(6),
  birthday: joi.date().required(),
});

// Schema to update a user
export const updateUserRequestSchema = joi.object({
  email: joi.string().email(),
  username: joi.string(),
}).or('email', 'username');

// Schema to authenticate a user
export const authenticateUserSchema = joi.object({
  email: joi.string().email(),
  username: joi.string(),
  password: joi.string().min(6).required(),
}).or('username', 'email');
