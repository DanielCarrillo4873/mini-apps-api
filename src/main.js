/**
 *
 *   Main.
 *   Main function to startup application
 *
 *   - Main function
 *
 */

// Load settings
import { PORT } from './settings.js';

import mongoClient from './database.js';
import server from './server.js';

/**
 * Test connection to database and run HTTP server if successful
 */
export default function main() {
// Testing connection to database
  mongoClient.db().command({ ping: 1 })
    .then(() => {
      console.log('Database connected');
      // Run express server
      server.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
      });
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
