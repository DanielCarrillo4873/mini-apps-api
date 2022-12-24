/**
*
*   API Routes
*   API end points and map to controllers and middlewares assigment
*
 * */

import { Router } from 'express';
import accountsRouter from './accounts.route.js';
import contentTypeJson from '../middlewares/content-type-json.js';
import requestBodySchemaValidation from '../middlewares/request-body-schema-validation.js';
import { authenticateUserSchema } from '../request-body-schemas/accounts.requestschema.js';
import authController from '../controllers/auth.controller.js';
import { entryPointController, signupController } from '../controllers/api.controller.js';

const router = Router();

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
