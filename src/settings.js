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
export const JWT_KEY = process.env.JSONWEBTOKEN_KEY || 'JS0NW3BT0K3NK3Y';

/**
 * JWT expiration time
 * @type {String}
 * @default 5m
 * @constant
 */
export const JWT_EXP_TIME = process.env.JWT_EPIRATION_TIME || '5m';

/**
 * JWT algorithm to sign token
 * @type {String}
 * @default HS256
 * @constant
 */
export const JWT_AL = process.env.JWT_ALGORITHM || 'HS256';

/**
 * JWT expiration enable o disable
 * @type {Boolean}
 * @default true
 * @constant
 */
export const JWT_ENABLE_EXP = process.env.JWT_ENALBE_EXP || true;

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

/**
 * Enable authentication
 * @type {Boolean}
 * @default false
 * @constant
 */
export const ENABLE_AUTH = process.env.ENABLE_AUTH || false;
