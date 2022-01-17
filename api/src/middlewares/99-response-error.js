const config = require("../config");
const logger = require("../logger");
const ServerError = require("../error");

module.exports = (app) => {
  //standard error handler
  app.use((err, req, res, next) => {
    let payload;
    if (req.headers && req.headers["x-request-id"])
      err["x-request-id"] = req.headers["x-request-id"];
    if (req.headers && req.headers["x-application-id"])
      err["x-application-id"] = req.headers["x-application-id"];

    //Loggin error
    logger.error(
      `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`,
      err
    );

    // in case of a connection error hide the technical error details from the reported error
    if (err.__proto__.name == "MongooseError") {
      err.message = "Connection to database failed. Please try again later";
    }
    //Error Payload preparation
    if (config.ENVIRONMENT == "development") {
      payload = err;
    } else {
      payload = {
        message: err.message || err,
        code: err.code,
      };
    }

    //Set status
    res.status(err.status || 500);

    //Response
    const path = req.url.split("/");
    //const responseType = path[1] < "v3" ? 1 : config.instance.responseVersion;
    const responseType = config.instance.responseVersion;
    switch (responseType) {
      case 1: //OLD Proxim APIs  v1, v2, v21
        res.json({
          success: false,
          message: payload.message,
        });
        break;

      case 4:
        res.json({
          "#error": payload,
          "#meta": res.locals.meta,
        });
        break;

      case 5:
      default:
        res.json({
          error: payload,
          meta: res.locals.meta,
        });
        break;
    }
  });
};

/*
{
    "success": false,
    "message": "401:Unauthorized"
}
*/
