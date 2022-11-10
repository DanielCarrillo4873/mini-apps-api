/*
*
*   Settings
*   Default setting for application
*
*   - Loads env variables
*   - Set default settings
*
* */

import { config } from 'dotenv';

// Loading env variables from .env file or provided by command line
config();

// Port to run HTTP server
export const PORT = process.env.PORT || 3000;
// Connection URI for mongoDB
export const DATABASE_URI = process.env.DATABASE_URI || 'mongodb://localhost/';
// Jsonwebtoken key for authentication
export const JSONWEBTOKEN_KEY = process.env.JSONWEBTOKEN_KEY || 'JS0NW3BT0K3NK3Y';
// App mode DEVELOPMENT | PRODUCTION
export const NODE_ENV = 'DEVELOPMENT';
