const config = require("../config");
module.exports = (app) => {
  //adds meta to standard response object
  app.use((req, res, next) => {
    res.locals.meta = {
      platform: config.instance.name,
      version: config.instance.version,
    };
    next();
  });

  //Simple test to see that the server is up and responding
  app.get("/api", (req, res) => {
    res.json({
      openapi: "/openapi", // this.openapiPath,
      name: config.instance.name,
      version: config.instance.version,
    });
  });
};
