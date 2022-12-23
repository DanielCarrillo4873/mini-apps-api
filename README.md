# Mini Apps API REST

API Rest for mini-apps application. Handles all request, except for frontend app request.

## Environment variables
- PORT: Defines the port to run HTTP server.
- DATABASE_URI: Defines the URI to connect to mongoDB instance.
- JSONWEBTOKEN_KEY: Defines key to encrypt JWT token.
- NODE_ENV: Defines the execution mode.
- SALT: Defines the quantity of salt for password encryption.

## Run

### Production
Declare needed env variables

In .evn file or through command line env variables declaration.

If you not provide any of env variables, default settings will be used.

Set environment variable NODE_ENV to 'PRODUCTION'

```
npm install 
```

```
npm start 
```

### Development
To run in development mode set environment variable NODE_ENV to 'DEVELOPMENT'. With the installation of dev 
dependencies nodemon reset will be available.

````
npm installd -D
````

````
npm run serve
````

## Modes

This application has two modes: **DEVELOPMENT** and **PRODUCTION**. In **DEVELOPMENT** mode morgan usage is available, which
permit prompts to be sent to STDOUT with every request. In **PRODUCTION** mode this feature will be disabled.

## Default settings

Default setting are set in src/settings.js file.

- PORT: 3000
- DATABASE_URI: mongodb://localhost/
- JSONWEBTOKEN_KEY: JS0NW3BT0K3NK3Y
- NODE_ENV: DEVELOPMENT
- SALT: 10
