/*
*
*   New User Request Schema
*
* */

import joi from 'joi';

const NewUserRequestSchema = joi.object({
  email: joi.string().required().email(),
  username: joi.string().required(),
  password: joi.string().required().min(6),
  birthday: joi.date().required(),
});

export default NewUserRequestSchema;
