// const { Middleware } = require('swagger-express-middleware');
const fs = require("fs");
const path = require("path");
const express = require("express");
const logger = require("./logger");
const config = require("./config");
const ServerError = require("./error");
const services = require("./services");
// const openRoutes = require('./openRoutes');
// const authService = require("./services/AuthService");

class ExpressServer {
  constructor() {
    this.app = express();
    try {
      let dirpath = config.FILE_UPLOAD_PATH;
      fs.mkdirSync(dirpath, { recursive: true });
      logger.info(`Directory ${dirpath} has been created.`);

      //this.schema = jsYaml.safeLoad(fs.readFileSync(config.OPENAPI_YAML));
      this.setupMiddlewares();
      services.init(this.app); //Initializes all services and database connection to Mongo
    } catch (e) {
      logger.error(`Failed to start Express Server: ${e.message}`);
    }
  }

  setupMiddlewares() {
    //load middlewares
    let files = fs.readdirSync(path.join(__dirname, "middlewares")).sort();
    files.forEach((file) => {
      if (file.substr(0, 2) != "XX") {
        require(`./middlewares/${file}`)(this.app);
      }
    });
  }

  getApp() {
    return this.app;
  }
}

module.exports = ExpressServer;
