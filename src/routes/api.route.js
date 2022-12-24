/**
 *
 *   API Router
 *
 *   - Entry point
 *   - Auth
 *   - Sigh up
 *   - Accounts
 *
 */

import { Router } from 'express';

// ********** Routers **********
import accountsRouter from './accounts.route.js';

// ********** Middlewares **********
import contentTypeJson from '../middlewares/content-type-json.js';
import requestBodySchemaValidation from '../middlewares/request-body-schema-validation.js';

// ********** Request body schema **********
import { authenticateUserSchema } from '../request-body-schemas/accounts.requestschema.js';

// ********** Controllers **********
import authController from '../controllers/auth.controller.js';
import { entryPointController, signupController } from '../controllers/api.controller.js';

const router = Router();

// ********** Routes **********
// Entry point
router.get('/', entryPointController);

// Authentication route
router.post(
  '/auth',
  contentTypeJson,
  requestBodySchemaValidation(authenticateUserSchema),
  authController,
);

// Sign up route
router.post('/signup', signupController);

// Users routes
router.use(
  '/accounts',
  contentTypeJson,
  accountsRouter,
);

export default router;
