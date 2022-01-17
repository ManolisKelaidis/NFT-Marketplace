const ServerError = require("../../error");
const config = require("../../config");   //TODO in reality here we should receive the configuration from the dispatcher and not reading it globally
const logger = require("../../logger");

async function send (data) {
  return {msg: "something"}
}

module.exports = {
  send
};
