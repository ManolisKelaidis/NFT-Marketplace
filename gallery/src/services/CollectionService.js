import swaggerProps from "../plugins/swagger-client";

export default class CollectionService {
 
  createCollection(payload) {
    return swaggerProps.swagger
      .then((client) => {
        return client.apis.Collection.createCollection(
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

  retrieveCollections(params = {}) {
    return swaggerProps.swagger
      .then((client) => {
        return client.apis.Collection.retrieveCollections(
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

  retrieveCollection(collectionId) {
    return swaggerProps.swagger
      .then((client) => {
        return client.apis.Collection.retrieveCollection(
          { collectionId },
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

  deleteCollection(userId) {
    return swaggerProps.swagger
      .then((client) => {
        return client.apis.Collection.deleteCollection(
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

  updateCollection(userId,info) {
    console.log(info)
    return swaggerProps.swagger
      .then((client) => {
        return client.apis.Collection.updateCollection(
          {userId:userId},
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
