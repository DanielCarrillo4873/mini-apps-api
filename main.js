/*
*
*   Main
*   Application entry point
*
*   - Loads settings for application
*   - Connects mongoose to database
*   - Run HTTP server if needed requirements are present
*
*   **** Needed requirements ****
*   - Connection to mongoDB instance
*   - Provided or default port free
*
* */

import mongoose from 'mongoose';
import { PORT, DATABASE_URI } from './src/settings.js';
import server from './src/server.js';

mongoose.set('strictQuery', false);
mongoose.connect(DATABASE_URI)
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
