/***************************************************************************
 * The UsersController file implements the controller, i.e.:
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
const UsersService = require("../services/UsersService");
const AuthService = require("../services/auth");

//Additional Services
//nothing really true

/*****************************
* Creates a new User 
*
* body User
* returns User
**/ 
const createUser = async (req, res, next) => {
  try {
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller createUser] reqData`, reqData);

    
    // TODO: ADDITIONAL VALIDATION
    
    // TODO: IMPLEBMENT BUSINESS LOGIC

    let user = await AuthService.createUser(
      reqData.body,
      reqData.user
    );
    if (!user) {
      throw new ServerError({
        code: 400,
        message: "Unable to create a User",
      });
    }
    logger.debug(`[createUser] Entity created!`, user);

    // ATTACH RESPONSE DATA
    res.locals.data = user;
    next();
  } catch (error) {
    next(error);
  }
};

/*****************************
* Retrieves a single User 
*
* User String
* returns User
**/ 
const retrieveUser = async (req, res, next) => {
  try {
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller retrieveUser] reqData`, reqData);

    // TODO: ADDITIONAL VALIDATION
    
    // TODO: IMPLEBMENT BUSINESS LOGIC

    const user = await UsersService.retrieveUser({
      id: reqData.userId,
    });
    if (!user) {
      throw new ServerError({
        code: 404  // NOT FOUND
      });
    }
    logger.debug(`[retrieveUser] User retrieved!`, user);
    
    // ATTACH RESPONSE DATA
    res.locals.data = user;
    next();
  } catch (error) {
    next(error);
  }
};


/*****************************
* Retrieves a set of Users 
*
* User String
* returns User[]
**/ 
const retrieveUsers = async (req, res, next) => {
  try {
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller retrieveUsers] reqData`, reqData);

    // TODO: ADDITIONAL VALIDATION
    
    // TODO: IMPLEBMENT BUSINESS LOGIC

    // TODO: Are we able to build a different filter object than simply passing reqData?
    
    const users = await UsersService.retrievesUser({
      filter: reqData
    });
    if (!users) {
      users = [];
    }
    logger.debug(`[retrieveUsers] Users retrieved!`, users);
    
    // ATTACH RESPONSE DATA
    res.locals.data = users;
    next();
  } catch (error) {
    next(error);
  }
};


/*****************************
* Deletes a single User 
*
* body User
* returns nothing
**/ 
const deleteUser = async (req, res, next) => {
  try {
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller deleteUser] reqData`, reqData);


    // TODO: ADDITIONAL VALIDATION

    // TODO: IMPLEBMENT BUSINESS LOGIC

    //Check if the user exists
    const user = await UsersService.retrieveUser({
      id: reqData.userId,
    });
    if (!user) {
      throw new ServerError({
        code: 404  // NOT FOUND
      });
    }
    logger.debug(`[deleteUser] User retrieved!`, user);

    const deletedUser = await UsersService.deleteUser(
      reqData.userId,
      reqData.user
    );
    if (!deletedUser) {
      throw new ServerError({
        code: 400,
        message: "Unable to delete a User",
      });
    }
    logger.debug(`[deleteUser] Entity deleted!`, deletedUser);

    // DONT'T ATTACH ANY RESPONSE DATA
    next();
  } catch (error) {
    next(error);
  }
};


/*****************************
* Updates a single User 
*
* body User
* returns User
**/
const updateUser = async (req, res, next) => {
  try { 
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller updateUser] reqData`, reqData);

    
    // TODO: ADDITIONAL VALIDATION
    
    // TODO: IMPLEBMENT BUSINESS LOGIC


    //Check if the user exists
    const user = await UsersService.retrieveUser({
      id: reqData.userId,
    });
    if (!user) {
      throw new ServerError({
        code: 404  // NOT FOUND
      });
    }
    logger.debug(`[updateUser] User retrieved!`, user);

    const updatedUser = await UsersService.updateUser(
      user,
      reqData.body,
      reqData.user
    );
    if (!updatedUser) {
      throw new ServerError({
        code: 400,
        message: "Unable to update a User",
      });
    }
    logger.debug(`[updateUser] Entity updated!`, updatedUser);

    // ATTACH RESPONSE DATA
    res.locals.data = updatedUser;
    next();
  } catch (error) {
    next(error);
  }
};



module.exports = {
  createUser,
  retrieveUser,
  retrieveUsers,
  deleteUser,
  updateUser,
};