/*
*
*   API Routes
*   API end points and map to controllers and middlewares assigment
*
 * */

import { Router } from 'express';
import usersRouter from './accounts.route.js';
import contentTypeJson from '../middlewares/content-type-json.js';
import requestBodySchemaValidation from '../middlewares/request-body-schema-validation.js';
import { authenticateUserSchema } from '../request-body-schemas/accounts.requestschema.js';
import authController from '../controllers/auth.controller.js';

const router = Router();

// Entry point
router.get('/', (req, res) => {
  res.json({
    title: 'Mini-Apps-API',
    description: 'Mini apps api, all resources, operations, authentication and authorization.',
    version: 1,
    ok: 1,
  });
});

// Authentication route
router.post('/auth', contentTypeJson, requestBodySchemaValidation(authenticateUserSchema), authController);

// Sign up route
router.post('/signup', (req, res) => {
  // noinspection JSDeprecatedSymbols
  res.redirect('users', 308);
});

// Users routes
router.use('/users', usersRouter);

export default router;
