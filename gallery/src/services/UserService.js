import swaggerProps from "../plugins/swagger-client";

export default class UserService {
  loginUser(payload) {
    console.log(payload)
    // {...payload, username: "test", pin: "pin_test"}
    return swaggerProps.swagger
      .then((client) => {
        return client.apis.Auth.login(
          {},
          swaggerProps.buildRequest({...payload,username: "test",pin :"pin_test"}),
          {}
        );
      })
      .then((response) => {
        console.log(response.body)
        return response;
      })
      .catch((error) => {
        return Promise.reject(error.response);
      });
  }

  createUser(payload) {
    return swaggerProps.swagger
      .then((client) => {
        return client.apis.User.createUser(
          {},
          swaggerProps.buildRequest(payload),
          {}
        );
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  retrieveUsers(params = {}) {
    return swaggerProps.swagger
      .then((client) => {
        return client.apis.User.retrieveUsers(
          params,
          swaggerProps.buildRequest(),
          {}
        );
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  retrieveUser(userId) {
    return swaggerProps.swagger
      .then((client) => {
        return client.apis.User.retrieveUser(
          { userId },
          swaggerProps.buildRequest(),
          {}
        );
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  deleteUser(userId) {
    return swaggerProps.swagger
      .then((client) => {
        return client.apis.User.deleteUser(
          { userId },
          swaggerProps.buildRequest(),
          {}
        );
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  updateUser(userId, info) {
    return swaggerProps.swagger
      .then((client) => {
        return client.apis.User.updateUser(
          { userId: userId },
          swaggerProps.buildRequest(info),
          {}
        );
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}
