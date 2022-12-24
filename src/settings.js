/**
 *
 *   Settings.
 *   Default setting for application
 *
 *   - Loads env variables from .env file
 *   - Set default settings or use env variables values
 *
 */

import { config } from 'dotenv';

// Loading env variables from .env file or provided by command line
config();

/**
 * Port number for HTTP server
 * @type {Number}
 * @default 3000
 * @constant
 * */
export const PORT = process.env.PORT || 3000;

/**
 * Database URI to connect to database
 * @type {String}
 * @default mongodb://localhost/mini-apps
 * @constant
 */
export const DATABASE_URI = process.env.DATABASE_URI || 'mongodb://localhost/mini-apps';

/**
 * JSON Web Token key
 * @type {String}
 * @default JS0NW3BT0K3NY
 * @constant}
 */
export const JSONWEBTOKEN_KEY = process.env.JSONWEBTOKEN_KEY || 'JS0NW3BT0K3NK3Y';

/**
 * Application mode
 * @type {String}
 * @default DEVELOPMENT
 * @constant
 */
export const NODE_ENV = 'DEVELOPMENT';

/**
 * Number of salts to encrypt password
 * @type {number}
 * @default 10
 * @constant
 */
export const SALTS = 10;
