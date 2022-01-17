const logger = require("../logger");
const express = require("express");
const config = require("../config");

module.exports = (app) => {
  app.use("/public", express.static(config.FILE_UPLOAD_PATH));
  logger.info(`/public directory mapped to ${config.FILE_UPLOAD_PATH}`);

  app.get("/favicon.ico", (req, res) => {
    res.status(404);
    res.send("NOT FOUND");
  });
};
