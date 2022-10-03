/*
*
*   Server
*   Main HTTP instance
*
*   - Creates express instance
*   - Set main routes
*
* */

import express from 'express';
import morgan from 'morgan';

const server = express();

// Middlewares
server.use(morgan('dev'));

// Entry point
server.get('/', (req, res) => {
  res.json({
    ok: 1,
    title: 'Mini-Apps-API',
    description: 'Mini apps api, all resources, operations, authentication and authorization.',
    version: 1,
  });
});

export default server;
