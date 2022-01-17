const dispatcher = require("../../dispatcher.js");

async function send (data) {
  return await dispatcher("email", "send", data);
}

module.exports = {
  send
};
