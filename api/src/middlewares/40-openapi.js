const config = require("../config");
const path = require("path");
const OpenApiValidator = require("express-openapi-validator");
const swaggerUI = require("swagger-ui-express");
const jsYaml = require("js-yaml");
const fs = require("fs");
const authService = require("../services/auth");
const openapiFormats = require("../utils/openapi-formats");

module.exports = (app) => {
  //OpenAPI file
  app.get("/api-doc", (req, res) =>
    res.sendFile(path.join(__dirname, "..", "openapi.json"))
  );

  //Swagger-UI
  const schema = jsYaml.load(fs.readFileSync(config.OPENAPI_YAML));
  app.use("/swagger", swaggerUI.serve, swaggerUI.setup(schema));

  //Openapi Validator
  app.use(
    OpenApiValidator.middleware({
      apiSpec: config.OPENAPI_YAML,
      validateRequests: {
        coerceTypes: true
      }, // (default)
      validateResponses: false, // false by default
      validateSecurity: {
        handlers: {
          bearerAuth: authService.validateAccess,
        },
      },
      validateFormats: "full",
      formats: openapiFormats.formats,  //custom formats
      fileUploader: { dest: config.FILE_UPLOAD_PATH },
      operationHandlers: path.join(__dirname, "..", "controllers"),
    })
  );
};
