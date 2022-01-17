const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");
const config = require("../config/index");
const logger = require("../logger");
const i18n = require("../i18n");

class Controller {
  static sendResponse(response, payload) {
    // handles file downloads with code 211
    if ((payload.code = 211 && payload.payload && payload.payload.pathname)) {
      const filepath = payload.payload.pathname;
      const filename = payload.payload.filename || filepath;
      const extension = filename.split(".").pop();

      if (extension == "zip") {
        response.set("Content-Type", "application/zip");
        // response.set("Content-Encoding", "gzip");
      } else {
        response.set("Content-Type", "text/" + extension);
      }

      logger.debug(`[Download] Download file ${filepath}`);
      response.download(filepath, filename, (err) => {
        if (err) logger.error(err);
        if (payload.payload.deleteAfterDownload == true) {
          logger.debug(` Remove file ${filepath}`);
          fse.removeSync(filepath);
        }
      });

      //TODO: can we delete the file?
      // if (payload.payload.deleteAfterDownload == true) {
      //   return fse.removeSync(filepath);
      // }
      return;
    }
    /**
     * The default response-code is 200. We want to allow to change that. in That case,
     * payload will be an object consisting of a code and a payload. If not customized
     * send 200 and the payload as received in this method.
     */
    response.status(payload.code || 200);
    const responsePayload =
      payload.payload !== undefined ? payload.payload : payload;
    if (responsePayload instanceof Object) {
      response.json(responsePayload);
    } else {
      response.end(responsePayload);
    }
  }

  static sendError(response, error) {
    logger.error("SERVER ERROR", error);
    response.status(error.code || 500);
    if (error.error instanceof Object) {
      response.json(error.error);
    } else if (error instanceof Object) {
      response.json(error);
    } else {
      response.end(error.error || error.message || error);
    }
  }

  /**
   * Files have been uploaded to the directory defined by config.js as upload directory
   * Files have a temporary name, that was saved as 'filename' of the file object that is
   * referenced in reuquest.files array.
   * This method finds the file and changes it to the file name that was originally called
   * when it was uploaded. To prevent files from being overwritten, a timestamp is added between
   * the filename and its extension
   * @param request
   * @param fieldname
   * @returns {string}
   */
  static collectFiles(request, fieldname = null, singleFile = false) {
    let uploadedFiles;
    if (request.files && request.files.length > 0) {
      if (singleFile) {
        //we are looking for just one file
        const fileObject = request.files.find(
          (file) => file.fieldname === fieldname
        );
        uploadedFiles = {
          filename: fileObject.originalname,
          url: this.getFile(fileObject),
        };
      } else {
        //let's return the entire array of files
        uploadedFiles = [];
        request.files.forEach((fileObject) => {
          if (fieldname) {
            if (
              fieldname == fileObject.fieldname ||
              `${fieldname}[]` == fileObject.fieldname
            ) {
              uploadedFiles.push({
                filename: fileObject.originalname,
                url: this.getFile(fileObject),
              });
            }
          } else {
            uploadedFiles.push({
              filename: fileObject.originalname,
              url: this.getFile(fileObject),
            });
          }
        });
      }
    }
    return uploadedFiles;
  }

  static collectSingleFile(request, fieldname = null) {
    return this.collectFiles(request, fieldname, true);
  }

  static getFile(fileObject) {
    let uploadedFileName;
    if (fileObject) {
      const fileArray = fileObject.originalname.split(".");
      const extension = fileArray.pop();
      fileArray.push(`_${Date.now()}`);
      uploadedFileName = `${fileArray.join("")}.${extension}`;
      fs.renameSync(
        path.join(config.FILE_UPLOAD_PATH, fileObject.filename),
        path.join(config.FILE_UPLOAD_PATH, uploadedFileName)
      );
    }
    return uploadedFileName;
  }

  static collectRequestParams(request) {
    const requestParams = {};
    if (request.user) {
      requestParams.user = request.user;
    }
    if (request.headers) {
      //TODO bail out if the application id is nt supported?
      if (request.headers["x-application-id"])
        requestParams.appId = request.headers["x-application-id"];
      if (request.headers["x-request-id"])
        requestParams.requestId = request.headers["x-request-id"];
      requestParams.language =
        request.headers["accept-language"] == "en" ? "en" : "it"; //TODO probably should be smarter
    } else {
      requestParams.language = "it";
    }
    i18n.setLocale(requestParams.language);
    //if (request.openapi.schema.requestBody !== undefined) {
    if (request.openapi.schema.requestBody) {
      const { content } = request.openapi.schema.requestBody;

      if (request.is("application/json")) {
        if (content["application/json"] !== undefined) {
          const schema =
            request.openapi.schema.requestBody.content["application/json"];
          if (schema.$ref) {
            requestParams[schema.$ref.substr(schema.$ref.lastIndexOf("."))] =
              request.body;
          } else {
            requestParams.body = request.body;
          }
        } else {
          throw `Content-Type ${request.headers["content-type"]} doesn't have a corresponding Openapi specification`;
        }
      } else if (request.is("application/x-www-form-urlencoded")) {
        if (content["application/x-www-form-urlencoded"] !== undefined) {
          const schema =
            request.openapi.schema.requestBody.content[
              "application/x-www-form-urlencoded"
            ];
          if (schema.$ref) {
            requestParams[schema.$ref.substr(schema.$ref.lastIndexOf("."))] =
              request.body;
          } else {
            requestParams.body = request.body;
          }
        } else {
          throw `Content-Type ${request.headers["content-type"]} doesn't have a corresponding Openapi specification`;
        }
      } else if (request.is("multipart/form-data")) {
        if (content["multipart/form-data"] !== undefined) {
          requestParams.body = {};
          Object.keys(content["multipart/form-data"].schema.properties).forEach(
            (property) => {
              const propertyObject =
                content["multipart/form-data"].schema.properties[property];
              switch (propertyObject.type) {
                case "array":
                  if (
                    propertyObject.items !== undefined &&
                    propertyObject.items.format !== undefined &&
                    propertyObject.items.format === "binary"
                  ) {
                    requestParams.body[property] = this.collectFiles(
                      request,
                      property
                    );
                  } else {
                    //throw(`collectRequestParams: array of 'normal' properties not managed yet.`);
                    requestParams.body[property] = request.body[property];
                  }
                  break;
                case "allOf":
                case "anyOf":
                  throw `collectRequestParams: option ${propertyObject.type} not managed yet.`;
                  break;
                default:
                  //it's a simple property
                  if (
                    propertyObject.format !== undefined &&
                    propertyObject.format === "binary"
                  ) {
                    requestParams.body[property] = this.collectSingleFile(
                      request,
                      property
                    );
                  } else {
                    requestParams.body[property] = request.body[property];
                  }
              }
            }
          );
        } else {
          throw `Content-Type ${request.headers["content-type"]} doesn't have a corresponding Openapi specification`;
        }
      } else {
        throw `Content-Type ${request.headers["content-type"]} not supported`;
      }

      //   if (content["application/json"] !== undefined) {
      //     const schema =
      //       request.openapi.schema.requestBody.content["application/json"];
      //     if (schema.$ref) {
      //       requestParams[schema.$ref.substr(schema.$ref.lastIndexOf("."))] =
      //         request.body;
      //     } else {
      //       requestParams.body = request.body;
      //     }
      //   } else if (content["multipart/form-data"] !== undefined) {
      //     requestParams.body = {};
      //     Object.keys(content["multipart/form-data"].schema.properties).forEach(
      //       (property) => {
      //         const propertyObject = content["multipart/form-data"].schema.properties[property];
      //         switch(propertyObject.type) {
      //           case 'array':
      //             if (propertyObject.items.format !== undefined && propertyObject.items.format === "binary") {
      //               requestParams.body[property] = this.collectFiles(request);
      //             } else {
      //               //throw(`collectRequestParams: array of 'normal' properties not managed yet.`);
      //               requestParams.body[property] = request.body[property];
      //             }
      //             break;
      //           case 'allOf':
      //           case 'anyOf':
      //             throw(`collectRequestParams: option ${propertyObject.type} not managed yet.`);
      //             break;
      //           default:
      //             //it's a simple property
      //             if (
      //               propertyObject.format !== undefined &&
      //               propertyObject.format === "binary"
      //             ) {
      //               requestParams.body[property] = this.collectFiles(request, property);
      //             } else {
      //               requestParams.body[property] = request.body[property];
      //             }
      //         }
      //       }
      //     );
      //   }
    }

    // in case parameters keyword is missing skip the following iteration
    if (!request.openapi.schema.parameters) {
      return requestParams;
    }

    request.openapi.schema.parameters.forEach((param) => {
      if (param.in === "path") {
        requestParams[param.name] = request.openapi.pathParams[param.name];
      } else if (param.in === "query") {
        requestParams[param.name] = request.query[param.name];
      } else if (param.in === "header") {
        requestParams[param.name] = request.headers[param.name];
      }
    });
    return requestParams;
  }

  static async handleRequest(request, response, serviceOperation) {
    try {
      const serviceResponse = await serviceOperation(
        this.collectRequestParams(request)
      );
      Controller.sendResponse(response, serviceResponse);
      return serviceResponse;
    } catch (error) {
      Controller.sendError(response, error);
      //???
      throw error;
    }
  }
}

module.exports = Controller;
