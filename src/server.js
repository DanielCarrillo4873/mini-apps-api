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
import { routeNotFound } from './response-errors.js';
import usersRouter from './routes/users.route.js';

const server = express();

// Middlewares
server.use(morgan('dev'));
server.use(express.json());

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

// Route to catch all non-existing routes
server.all('*', (req, res) => {
  res.status(404);
  res.json(routeNotFound(req.path, req.method));
});

export default server;
