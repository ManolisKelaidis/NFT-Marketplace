const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");
const config = require("../config");
const logger = require("../logger");
// const compression = require("compression");

module.exports = (app) => {
  app.use(cors());

  app.use(helmet()); // protect the app from some well-known web vulnerabilities by setting HTTP headers appropriately
  app.use(bodyParser.json({ limit: config.BODY_SIZE }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.set("trust proxy", true); //to process X-Forwarded-For if behind a proxy
  // app.use(compression());
};
