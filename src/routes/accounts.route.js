/**
 *
 *   Users Routes
 *
 *   - Get account by username
 *   - Create account
 *   - Update allowed data account by username
 *   - Deleter account by username
 *
 */

import { Router } from 'express';

// ********** Middlewares **********
import requestBodySchemaValidation from '../middlewares/request-body-schema-validation.js';
import authentication from '../middlewares/authentication.js';

// ********** Request body schema **********
import {
  newAccountRequestSchema,
  updateAccountRequestSchema,
} from '../request-body-schemas/accounts.requestschema.js';

// ********** Controllers **********
import {
  getAccountController,
  createAccountController,
  updateAccountController,
  deleteAccountController,
} from '../controllers/accounts.controller.js';

const router = new Router();

// ********** Routes **********
// Get account information by username
router.get(
  '/:username',
  authentication,
  getAccountController,
);

// Create new account - Sing up
router.post(
  '/',
  requestBodySchemaValidation(newAccountRequestSchema),
  createAccountController,
);

// Update account information
router.patch(
  '/:username',
  authentication,
  requestBodySchemaValidation(updateAccountRequestSchema),
  updateAccountController,
);

// Delete account by username - Delete account
router.delete(
  '/:username',
  authentication,
  deleteAccountController,
);

export default router;
