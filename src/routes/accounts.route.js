/*
*
*   Users Routes
*   Users end points map to controllers and middleware assignment
*
 */

import { Router } from 'express';
import contentTypeJson from '../middlewares/content-type-json.js';
import requestBodySchemaValidation from '../middlewares/request-body-schema-validation.js';
import { newAccountRequestSchema, updateAccountRequestSchema } from '../request-body-schemas/accounts.requestschema.js';
import {
  getAccountController, createAccountController, updateAccountController, deleteAccountController,
} from '../controllers/accounts.controller.js';

const router = new Router();

// Get account information by username
router.get('/:username', getAccountController);

// Create new account - Sing up
router.post('/', contentTypeJson, requestBodySchemaValidation(newAccountRequestSchema), createAccountController);

// Update account information
router.patch('/:username', requestBodySchemaValidation(updateAccountRequestSchema), updateAccountController);

// Delete account by username - Delete account
router.delete('/:username', deleteAccountController);

export default router;
