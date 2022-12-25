# Mini Apps API REST

API Rest for mini-apps application. Handles all request, except for frontend app request.

## Environment variables
- PORT: Defines port to run HTTP server.
- DATABASE_URI: Defines URI to connect to mongoDB instance.
- JWT_KEY: Defines key to encrypt JWT.
- JWT_EXP_TIME: JWT expiration time
- JWT_AL: Algorithm to sign JWT.
- JWT_ENABLE_EXP: Enable expiration time for JWT.
- NODE_ENV: Defines the execution mode.
- SALT: Defines the quantity of salt for password encryption.
- ENABLE_AUTH: Toggle api authentication.

## Run
Declare needed env variables, in .evn file or through command line env variables declaration.
If you don't provide any of env variables, default settings will be used.

### Production
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

## Toggle authentication

It is possible to enable or disable user authentication, by setting env variable: **ENABLE_AUTH**. 
If value is set to true, it will be required, for all protected end points, to provide a valid JWT.
Otherwise, the end point will be accessible without JWT.

## Default settings

Default setting are set in src/settings.js file.

- PORT: 3000
- DATABASE_URI: mongodb://localhost/
- JWT_KEY: JS0NW3BT0K3NK3Y
- JWT_EXP_TIME: 5m
- JWT_AL: HS256
- JWT_ENABLE_EXP: true
- NODE_ENV: DEVELOPMENT
- SALT: 10
- ENABLE_AUTH: false
