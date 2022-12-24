/**
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
import { endPointNotFound } from './response-errors.js';
import apiRouter from './routes/api.route.js';
import { NODE_ENV } from './settings.js';

const server = express();

// Middlewares
server.use(express.json());

// Dev middlewares
if (NODE_ENV === 'DEVELOPMENT') {
  server.use(morgan('dev'));
}

// API Route
server.use('/api/v1/', apiRouter);

// Route to catch all non-existing end points
server.all('*', (req, res) => {
  res.status(404);
  res.json(endPointNotFound(req.path, req.method));
});

export default server;
