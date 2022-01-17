const dispatcher = require("../../dispatcher.js");

async function login (data) {
  return await dispatcher("auth", "login", data);
}

async function createUser (data) {
  return await dispatcher("auth", "createUser", data);
}

async function validateAccess(req, scopes, schema) {
  return await dispatcher(
    "auth",
    "validateAccess",
    {
      req,
      scopes,
      schema
    }
  );
}

module.exports = {
  login,
  createUser,
  validateAccess
};
