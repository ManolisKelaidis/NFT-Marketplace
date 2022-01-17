/***************************************************************************
 * The AuthController file implements the controller, i.e.:
 *  - Parameter validation
 *  - Additional auth checks
 *  - Business logic 
 * 
 * The heavy lifting of the Controller item is done in Controller.js - that is where request
 * parameters are extracted and given as input to each Controller.
 * Service are responsible for storing/extracting data and communication
 */

const Controller = require("./Controller");
const ServerError = require("../error");
const config = require("../config");
const logger = require("../logger");

//Standard entity service
const AuthService = require("../services/auth");

//Additional Services


const login = async (req, res, next) =>{
  try{
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller login] reqData`, reqData);
    
    const token = await AuthService.login(
      reqData.body
    )
    if (token == null){
      throw new ServerError({
        code: 404,
        message: "User not found"
      });
    }
    //everything oK, let's return the token
    res.locals.data = {
      token
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};