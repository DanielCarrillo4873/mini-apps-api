/**
 *
 *   Main.
 *   Application entry point
 *
 *   - Loads settings for application
 *   - Connect to database
 *   - Run HTTP server if database is connected
 *
 */

import { PORT } from './src/settings.js'; // Loading settings from env file
import mongoClient from './src/database.js';
import server from './src/server.js';

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
