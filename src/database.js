/**
 *
 *   Database.
 *   MongoDbClient main instance
 *
 *   - Creates mongodb connection client instance
 *
 */

import { MongoClient } from 'mongodb';
import { DATABASE_URI } from './settings.js';

/**
 * Mongo Client instance
 * @type {MongoClient}
 * @constant
 */
const mongoClient = new MongoClient(DATABASE_URI);

export default mongoClient;
