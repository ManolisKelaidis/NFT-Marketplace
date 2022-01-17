const ServerError = require("../../error");
const logger = require("../../logger");

async function store (data, config) {
  return `/public/${data.url}`;
}

module.exports = {
  store
};
