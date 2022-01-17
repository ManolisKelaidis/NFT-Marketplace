const ServerError = require("../../error");
const config = require("../../config");   //TODO in reality here we should receive the configuration from the dispatcher and not reading it globally
const logger = require("../../logger");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Standard entity model
const User = require("../../models/User");

async function login (data) {
  try{
    let result = null;
    logger.silly(`[Service auth-login] input`, data);

    //TODO Implements all relevant chacks!!!

    let user = await User.findOne({ username: data.username }).exec();
    if (!user) {
      const dummy = {
        username: data.username,
        email: `${data.username}@zeronotary.com`,
        password: `CiaoCiao8`
      }
      user = await createUser(dummy);
    }

    //Generates the token
    const payload = {
      id: user._id,
      role: user.role,
    };
    result = createToken({ user: payload });

    logger.silly(`[Service auth-login] output`, result);
    return result;
  } catch (error) {
    throw error;
  }
};


/*****************************
 * Creates a new User
 *
 * body User
 * returns User
 **/
async function createUser(data, user) {
  try {
    logger.silly(`[Service auth-createUser] input`, data);

    //TODO should we validate the password?
    data.password = hashPassword(data.password);

    const result = await User.create(data);
    logger.silly(`[Service auth-createUser] output`, result);

    if (result.status != 'active') {
      await requireUserValidation(result);
    }

    return result;
  } catch (error) {
    throw error;
  }
}

/******************************
 * Starts next step in user validation
 */
 async function requireUserValidation(user) {
  try {
    logger.debug(`[User Validation required] current level ${user.level}`);

    let a = config;


  } catch (error) {
    throw error;
  }
}

async function validateAccess({req, scopes, schema}) {
  try {
    let ret = false;  //by default we prevent access
    let user;

    //Check access token presence
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      const token = authHeader && authHeader.split(" ")[1];
      if (token) {
        const tokenData = verifyToken(token);

        user = await User.findOne({
          _id: tokenData.user.id,
          //type: tokenData.role,
          status: 'active'
        });
    
        // check if token's payload contains data for an existing platform's user
        if (!user) {
          logger.debug(`[ValidateAccess] token: user id is not valid or user not active: ${tokenData.user.id}`);
          throw new ServerError({
            status: 401,
            message: "User doesn't have a valid token",
          });
        }

        // token has already been validated by the auth middlewares
        const securityScopes = normalizeSecurityScopes(req.openapi.schema["x-security-scopes"]);

        let type = stringType(user.role); //TODO: or should be taken from the token? This approach seems safer...

        const scope = securityScopes.find(s => s.role == type);
        // check if OpenApi API endpoint is allowed to this user according to his role
        if (!scope) {
          throw new ServerError({
            status: 401,
            message: "User role not allowed",
          });
        }

        if (scope.level && !levelAllowed(scope.level, user.level)) {
          throw new ServerError({
            status: 401,
            message: "User level not allowed",
          });
        }

        //Store user info in the req for future use
        req.user = {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          profile: user.profile,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        };

        //everything OK, access granted
        ret = true;
      }
    }

    return ret;
  } catch (e) {
    return false;
  }
}

function normalizeSecurityScopes(scopes) {
  let ret = [];
  if (scopes && scopes.length) {
    for (scope of scopes) {
      if (typeof scope == 'string') {
        ret.push({role: scope});
      } else {
        ret.push(scope);
      }
    }
  }
  return ret;
}

function levelAllowed(scopeLevel, userLevel) {
  ret = false;
  if (scopeLevel == userLevel) {
    ret = true;
  }
  return ret;
}

/***********************************************************************************
 * This function can be customized in case the type (for legacy reasons is numeric)
 *
 */
function stringType(type) {
  /*const types = {
    1: "proxim",
    2: "administrator",
    3: "agency",
    5: "client",
    9: "federa",
    10: "consumer",
  };
  return types[type];*/
  return type;
}

function hashPassword(password) {
  const hashedPassword = bcrypt.hashSync(password, config.auth.saltRounds);  //default saltRounds 10
  return hashedPassword;
}

function doPasswordsMatch(plainPassword, hashedPassword) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}


function createToken(data) {
  if (!config.auth.ACCESS_TOKEN_SECRET)
    throw new ServerError({ message: "Missing secret for access token configuration" });

  const token = jwt.sign(data, config.auth.ACCESS_TOKEN_SECRET, {
    expiresIn: config.auth.tokenExpiration, // expires in 24 hours by default
  });

  return token;
}

function verifyToken(token) {
  return jwt.verify(token, config.auth.ACCESS_TOKEN_SECRET);
}

async function hasValidAccessToken(req, scopes, schema) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  const routeSecurityScopes = req.openapi.schema["x-security-scopes"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return false; // if there isn't any token
  if (process.env.NODE_ENV == 'development' && token == config.auth.tokenPassthrough)
    return true;

  // check if the token signature is valid
  try {
    let tokenData = verifyToken(token);

    let user = await User.findOne({
      _id: tokenData.userId,
      role: tokenData.role,
      status: 'active'
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
    if (!routeSecurityScopes.includes(user.role)) {
      let requiredRoles = routeSecurityScopes.join(", ");
      throw {
        status: 401,
        //message: "Endpoint's allowed roles are: " + requiredRoles,
        message: "User role not allowed"
      };
    }
    
    //Store user info in the req for future use
    req.user = {
      id: user._id.toString(),
      email: user.email,
      type: user.role,
      profile: user.profile,    //TODO profiles management is handled in a different way and this should be probably removed or work with a previous populate
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return true;
  } catch(e) {
    return false;
  }
}

module.exports = {
  login,
  createUser,
  validateAccess
};
