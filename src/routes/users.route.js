/*
*
*   Users Routes
*   Users end points map to controllers and middleware assignment
*
 */

import { Router } from 'express';
import contentTypeJson from '../middlewares/content-type-json.js';
import requestBodySchemaValidation from '../middlewares/request-body-schema-validation.js';
import { newUserRequestSchema, updateUserRequestSchema } from '../request-body-schemas/users.requestschema.js';
import {
  getUser, createUser, updateUser, deleteUser,
} from '../controllers/users.controller.js';
import authentication from '../middlewares/authentication.js';

const router = new Router();

// Get a user by username
router.get('/:username', authentication, getUser);

// Create a user - Sing up
router.post('/', contentTypeJson, requestBodySchemaValidation(newUserRequestSchema), createUser);

// Update user information
router.patch('/:username', requestBodySchemaValidation(updateUserRequestSchema), authentication, updateUser);

// Delete a user by username - Delete account
router.delete('/:username', authentication, deleteUser);

export default router;
