/*
*
*   New User Request Schema
*
* */

import joi from 'joi';

export const newUserRequestSchema = joi.object({
  email: joi.string().required().email(),
  username: joi.string().required(),
  password: joi.string().required().min(6),
  birthday: joi.date().required(),
});

export const updateUserRequestSchema = joi.object({
  email: joi.string().email(),
  username: joi.string(),
}).or('email', 'username');

export const authenticateUserSchema = joi.object({
  email: joi.string().email(),
  username: joi.string(),
  password: joi.string().min(6).required(),
}).or('username', 'email');
