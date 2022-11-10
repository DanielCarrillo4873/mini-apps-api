/*
*
*   Server
*   Main HTTP instance
*
*   - Creates express instance
*   - Set main middlewares
*   - Set main routes
*
* */

import express from 'express';
import morgan from 'morgan';
import contentTypeJson from './middlewares/content-type-json.js';
import requestSchemaValidation from './middlewares/request-schema-validation.js';
import { routeNotFound } from './response-errors.js';
import { authenticateUserSchema } from './requests-schema-body/users.requestschema.js';
import { NODE_ENV } from './settings.js';

// Routes/Controllers
import usersRouter from './routes/users.route.js';
import authController from './controllers/auth.controller.js';

const server = express();

// Middlewares
server.use(express.json());

// Dev middlewares
if (NODE_ENV === 'DEVELOPMENT') {
  server.use(morgan('dev'));
}

// Entry point
server.get('/', (req, res) => {
  res.json({
    title: 'Mini-Apps-API',
    description: 'Mini apps api, all resources, operations, authentication and authorization.',
    version: 1,
    ok: 1,
  });
});

// Users routes
server.use('/users', usersRouter);

// Authentication route
server.post('/auth', contentTypeJson, requestSchemaValidation(authenticateUserSchema), authController);

// Route to catch all non-existing routes
server.all('*', (req, res) => {
  res.status(404);
  res.json(routeNotFound(req.path, req.method));
});

export default server;
