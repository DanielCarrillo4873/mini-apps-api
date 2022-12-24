/*
*
*   Account model and schema definition
*
* */

import { Schema, model } from 'mongoose';
import { hash } from 'bcrypt';
import { SALTS } from '../settings.js';

const statics = {
  getByUsername(username) {
    return this.aggregate([
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
        },
      },
    ])[0] || null;
  },
  async createAccount(data) {
    const ac = data;
    ac.password = await hash(data, SALTS);
    await this.insertOne(ac);
  },
};

const AccountSchemaDefinition = {
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    min: 6,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  name: {
    type: String,
    required: true,
  },
  firstLastname: {
    type: String,
    required: true,
  },
  secondLastname: String,
  birthday: {
    type: Date,
    required: true,
  },
  creationDate: {
    type: Date,
    immutable: true,
    default: Date.now(),
  },
};

const AccountSchema = new Schema(
  AccountSchemaDefinition,
  {
    statics,
  },
);

export default model('Account', AccountSchema);
