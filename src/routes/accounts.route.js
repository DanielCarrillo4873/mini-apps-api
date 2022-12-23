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
  getAccount, createAccount, updateAccount, deleteAccount,
} from '../controllers/accounts.controller.js';
import authentication from '../middlewares/authentication.js';

const router = new Router();

// Get account information by username
router.get('/:username', authentication, getAccount);

// Create new account - Sing up
router.post('/', contentTypeJson, requestBodySchemaValidation(newAccountRequestSchema), createAccount);

// Update account information
router.patch('/:username', requestBodySchemaValidation(updateAccountRequestSchema), authentication, updateAccount);

// Delete account by username - Delete account
router.delete('/:username', authentication, deleteAccount);

export default router;
