
const config = require('../config');
const logger = require('../logger');

module.exports = (app) => {
  //logging all http requests
  app.use((req, res, next) => {
    let payload = {
      'x-request-id': req.headers['x-request-id'],
      'x-application-id': req.headers['x-application-id'],
      url: req.originalUrl,
      method: req.method
    };
    if (config.ENVIRONMENT === 'development') {
      payload.body = req.body;
      payload.query = req.query;
      payload.params = req.params;
    }
    logger.http(`${req.originalUrl} - ${req.method} - ${req.ip}`, payload);
    next();
  });
}