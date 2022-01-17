import swaggerProps from "../plugins/swagger-client";

export default class BidService {
  createBid(payload) {
    return swaggerProps.swagger
      .then((client) => {
        return client.apis.Bid.createBid(
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

  retrieveBids(params = {}) {
    return swaggerProps.swagger
      .then((client) => {
        return client.apis.Bid.retrieveBids(
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

  retrieveBid(bidId) {
    return swaggerProps.swagger
      .then((client) => {
        return client.apis.Bid.retrieveBid(
          { bidId },
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

  deleteBid(bidId) {
    return swaggerProps.swagger
      .then((client) => {
        return client.apis.Bid.deleteBid(
          { bidId },
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

  updateBid(bidId, data) {
    console.log({ bidId });
    console.log(data);
    return swaggerProps.swagger
      .then((client) => {
        return client.apis.Bid.updateBid(
          { bidId },
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
