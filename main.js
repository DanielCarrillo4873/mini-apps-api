/**
*
*   Main
*   Application entry point
*
*   - Loads settings for application
*   - Connects to database
*   - Run HTTP server if needed requirements are present
*
*   **** Needed requirements ****
*   - Connection to mongoDB instance
*   - Provided or default port free
*
* */

import { PORT } from './src/settings.js';
import mongoClient from './src/database.js';
import server from './src/server.js';

mongoClient.db().command({ ping: 1 })
  .then(() => {
    console.log('Database connected');
    server.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`);
    });
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
