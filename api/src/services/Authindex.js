const logger = require("../logger");
//const keycloak = require("./keycloak");
//const federa = require("./federa");
const jwt = require("jsonwebtoken");
const objectID = require("mongoose").Types.ObjectId;
const User=require("../models/User");

function stringType(type) {
  const types = {
    1: "proxim",
    2: "administrator",
    3: "agency",
    5: "client",
    9: "federa",
    10: "consumer",
  };
  return types[type];
}

async function validateAccess(req, scopes, schema) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return false; // if there isn't any token
    let tokenData=await verifyToken(token);

      let user = await User.findOne({
        _id: new objectID(tokenData._id)
        //type: tokenData.type,
        //status: 'active'
      });
  
      // check if token's payload contains data for an existing platform's user
      if (!user) {
        logger.debug("token: user id is not valid");
        throw {
          status: 401,
          message: "This token is not signed in by a valid user",
        };
      }
      // check if OpenApi API endpoint is allowed to this user according to his role
      /*if (!routeSecurityScopes.includes(user.type)) {
        let requiredRoles = routeSecurityScopes.join(", ");
        throw {
          status: 401,
          //message: "Endpoint's allowed roles are: " + requiredRoles,
          message: "User role not allowed"
        };
      }
      */
      //Store user info in the req for future use
      req.user = {
        id: user._id.toString(),
        email: user.email,
        type: user.type,
        //profile: user.profile,
        //createdAt: user.createdAt,
        //updatedAt: user.updatedAt
      };
      
      return true;

    
  } catch (e) {
    return false;
  }
}


module.exports = {
  validateAccess,
};
