import swaggerProps from "../plugins/swagger-client";

export default class AssetService {
  createAsset(payload) {
    return swaggerProps.swagger
      .then((client) => {
        return client.apis.Asset.createAsset(
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

  retrieveAssets(params = {}) {
    return swaggerProps.swagger
      .then((client) => {
        return client.apis.Asset.retrieveAssets(
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

  retrieveAsset(assetId) {
    return swaggerProps.swagger
      .then((client) => {
        return client.apis.Asset.retrieveAsset(
          { assetId },
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

  deleteAsset(assetId) {
    return swaggerProps.swagger
      .then((client) => {
        return client.apis.Asset.deleteAsset(
          { assetId },
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

  updateAsset(assetId, data) {
    return swaggerProps.swagger
      .then((client) => {
        return client.apis.Asset.updateAsset(
          { assetId },
          swaggerProps.buildRequest(data),
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
