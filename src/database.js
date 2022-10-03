/*
*
*   Database
*   MongoDbClient main instance
*
*   - Creates mongodb connection instance
*
* */

import { MongoClient } from 'mongodb';
import { DATABASE_URI } from './settings.js';

const mongoClient = new MongoClient(DATABASE_URI);

export default mongoClient;
