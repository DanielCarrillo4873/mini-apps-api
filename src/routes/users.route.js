/*
*
*   Users Routes
*   Users end points map to controllers and middleware assignment
*
 */

import { Router } from 'express';
import contentTypeJson from '../middlewares/content-type-json.js';
import requestSchemaValidation from '../middlewares/request-schema-validation.js';
import { newUserRequestSchema, updateUserRequestSchema } from '../requests-schema-body/users.requestschema.js';
import {
  getUser, createUser, updateUser, deleteUser,
} from '../controllers/users.controller.js';

const router = new Router();

// Get a user by username
router.get('/:username', getUser);

// Update user information
router.patch('/:username', requestSchemaValidation(updateUserRequestSchema), updateUser);

// Delete a user by username - Delete account
router.delete('/:username', deleteUser);

export default router;
