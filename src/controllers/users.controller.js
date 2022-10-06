/*
*
*   Users Controllers
*   Function definitions for users controllers
*
* */

import database from '../database.js';
import { serverError } from '../response-errors.js';

const user = database.db('mini-apps').collection('user');

export async function getUser(req, res) {
  res.send('Get user');
}

export async function createUser(req, res) {
  try {
    const result = await user.insertOne(req.body);
    const newUser = await user.findOne({ _id: result.insertedId });
    res.status(201);
    res.json(newUser);
  } catch {
    res.status(500);
    res.json(serverError);
  }
}
export async function updateUser(req, res) {
  res.send('Update user');
}

export async function deleteUser(req, res) {
  res.send('Deleter user');
}
