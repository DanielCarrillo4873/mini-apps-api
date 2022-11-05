# Mini Apps API REST

API Rest for mini-apps application. Handles all request, except for frontend app request.

## Run

Declare needed env variables
- PORT
- DATABASE_URI
- JSONWEBTOKEN_KEY

In .evn file or though command line env variables declaration.

If you not provide any of env variables, default settings will be used.

```
npm install 
```


```
npm start 
```
### Default settings

Default setting are set in settings.js file.

- PORT: 3000
- DATABASE_URI: mongodb://localhost/
- JSONWEBTOKEN_KEY: JS0NW3BT0K3NK3Y
