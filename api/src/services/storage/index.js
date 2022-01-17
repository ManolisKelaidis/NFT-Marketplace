const dispatcher = require("../../dispatcher.js");

async function store (data) {
  return await dispatcher("storage", "store", data);
}

module.exports = {
  store
};
