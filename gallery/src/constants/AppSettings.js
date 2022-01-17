/* eslint-disable no-underscore-dangle */

/* TBD: use .env file to set the env variables */

// API domain
const api = {
    protocol: process.env.REACT_APP_API_PROTOCOL,
    host: process.env.REACT_APP_API_HOST,
    port: process.env.REACT_APP_API_PORT,
    basePath: process.env.REACT_APP_API_BASEPATH
  };
  
  export { api };
  