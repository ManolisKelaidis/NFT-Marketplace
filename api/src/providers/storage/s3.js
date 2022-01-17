const ServerError = require("../../error");
const logger = require("../../logger");

async function store (data, config) {
  return {msg: "S3"}
}

module.exports = {
  store
};
