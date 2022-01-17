const config = require("./config");
const logger = require("./logger");
const ExpressServer = require("./expressServer");
const http = require("http");

const launchServer = async () => {
  try {
    this.Server = new ExpressServer(config.OPENAPI_YAML);
    //this.Server.launch();
    http.createServer(this.Server.getApp()).listen(config.URL_PORT);
    logger.info(`Listening on port ${config.URL_PORT}`);
    logger.info("This is server pid: " + process.pid);
    logger.info("Express server running in mode: " + config.ENVIRONMENT);
  } catch (error) {
    logger.error(`Express Server failure: ${error.message}`);
    await this.close();
  }
};

launchServer().catch((e) => logger.error(e));
