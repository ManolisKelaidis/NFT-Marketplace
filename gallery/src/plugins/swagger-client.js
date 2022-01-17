import SwaggerClient from "swagger-client";
import { api } from "../constants/AppSettings";
import {getAuthToken} from "../helpers/auth"

const buildRequest = (requestBody, requestHeader) => {
  return {
    requestBody: requestBody,
    serverVariables: {
      protocol: api.protocol,
      host: api.host,
      basePath: api.basePath,
    },
  };
};

const swagger = new SwaggerClient("/api.v1.json", {
  requestInterceptor: (request) => {
    request.headers.Authorization = getAuthToken();
    return request;
  },
  responseInterceptor: (response) => {
    return response;
  },
}).catch((error) => console.log(error));

const swaggerProps = {
  swagger,
  buildRequest,
};

export default swaggerProps;
