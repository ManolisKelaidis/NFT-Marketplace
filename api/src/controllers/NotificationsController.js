/***************************************************************************
 * The NotificationsController file implements the controller, i.e.:
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
const NotificationsService = require("../services/NotificationsService");

//Additional Services
//nothing really

/*****************************
* Creates a new Notification 
*
* body Notification
* returns Notification
**/ 
const createNotification = async (req, res, next) => {
  try {
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller createNotification] reqData`, reqData);

  /*  let type = "create";
    let checkParam = await NotificationsService.checkParams(req.params, type);
    if (!checkParam) {
        throw new ServerError({
            code: 405,
            message: "No entry found",
        });
    } */
    
    // TODO: ADDITIONAL VALIDATION
    
    // TODO: IMPLEBMENT BUSINESS LOGIC

    let notification = await NotificationsService.createNotification(
      reqData.body,
      reqData.user
    );
    if (!notification) {
      throw new ServerError({
        code: 400,
        message: "Unable to create a Notification",
      });
    }
    logger.debug(`[createNotification] Entity created!`, notification);

    // ATTACH RESPONSE DATA
    res.locals.data = notification;
    next();
  } catch (error) {
    next(error);
  }
};

/*****************************
* Retrieves a single Notification 
*
* Notification String
* returns Notification
**/ 
const retrieveNotification = async (req, res, next) => {
  try {
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller retrieveNotification] reqData`, reqData);

    /*let type = "retrieve";
    let checkParam = await NotificationsService.checkParams(req.params, type);
    if (!checkParam) {
        throw new ServerError({
            code: 405,
            message: "No entry found",
        });
    }*/

    // TODO: ADDITIONAL VALIDATION
    
    // TODO: IMPLEBMENT BUSINESS LOGIC

    const notification = await NotificationsService.retrieveNotification({
      id: reqData.notificationId,
    });
    if (!notification) {
      throw new ServerError({
        code: 404  // NOT FOUND
      });
    }
    logger.debug(`[retrieveNotification] Notification retrieved!`, notification);
    
    // ATTACH RESPONSE DATA
    res.locals.data = notification;
    next();
  } catch (error) {
    next(error);
  }
};


/*****************************
* Retrieves a set of Notifications 
*
* Notification String
* returns Notification[]
**/ 
const retrieveNotifications = async (req, res, next) => {
  try {
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller retrieveNotifications] reqData`, reqData);

    /*let type = "retrieves";
    let checkParam = await NotificationsService.checkParams(req.params, type);
    if (!checkParam) {
        throw new ServerError({
            code: 405,
            message: "No entry found",
        });
    }*/

    // TODO: ADDITIONAL VALIDATION
    
    // TODO: IMPLEBMENT BUSINESS LOGIC

    // TODO: Are we able to build a different filter object than simply passing reqData?
    
    const notifications = await NotificationsService.retrievesNotification({
      filter: reqData
    },
    null,
    generateOptions(req));
    if (!notifications) {
      notifications = [];
    }
    logger.debug(`[retrieveNotifications] Notifications retrieved!`, notifications);
    
    // ATTACH RESPONSE DATA
    res.locals.data = notifications;
    next();
  } catch (error) {
    next(error);
  }
};


/*****************************
* Updates a single Notification 
*
* body Notification
* returns Notification
**/
const updateNotification = async (req, res, next) => {
  try { 
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller updateNotification] reqData`, reqData);

    /*let type = "update";
    let checkParam = await NotificationsService.checkParams(req.params, type);
    if (!checkParam) {
        throw new ServerError({
            code: 405,
            message: "No entry found",
        });
    }*/
    
    // TODO: ADDITIONAL VALIDATION
    
    // TODO: IMPLEBMENT BUSINESS LOGIC


    //Check if the notification exists
    const notification = await NotificationsService.retrieveNotification({
      id: reqData.notificationId,
    });
    if (!notification) {
      throw new ServerError({
        code: 404  // NOT FOUND
      });
    }
    logger.debug(`[updateNotification] Notification retrieved!`, notification);

    const updatedNotification = await NotificationsService.updateNotification(
      notification,
      reqData.body,
      reqData.user
    );
    if (!updatedNotification) {
      throw new ServerError({
        code: 400,
        message: "Unable to update a Notification",
      });
    }
    logger.debug(`[updateNotification] Entity updated!`, updatedNotification);

    // ATTACH RESPONSE DATA
    res.locals.data = updatedNotification;
    next();
  } catch (error) {
    next(error);
  }
};



/*****************************
* Deletes a single Notification 
*
* body Notification
* returns nothing
**/ 
const deleteNotification = async (req, res, next) => {
  try {
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller deleteNotification] reqData`, reqData);

    /*let type = "delete";
    let checkParam = await NotificationsService.checkParams(req.params, type);
    if (!checkParam) {
        throw new ServerError({
            code: 405,
            message: "No entry found",
        });
    }*/

    // TODO: ADDITIONAL VALIDATION

    // TODO: IMPLEBMENT BUSINESS LOGIC

    //Check if the notification exists
    const notification = await NotificationsService.retrieveNotification({
      id: reqData.notificationId,
    });
    if (!notification) {
      throw new ServerError({
        code: 404  // NOT FOUND
      });
    }
    logger.debug(`[deleteNotification] Notification retrieved!`, notification);

    const deletedNotification = await NotificationsService.deleteNotification(
      reqData.notificationId,
      reqData.user
    );
    if (!deletedNotification) {
      throw new ServerError({
        code: 400,
        message: "Unable to delete a Notification",
      });
    }
    logger.debug(`[deleteNotification] Entity deleted!`, deletedNotification);

    // DONT'T ATTACH ANY RESPONSE DATA
    next();
  } catch (error) {
    next(error);
  }
};



function generateOptions(request){
    let options={};
    if(request.query && request.query.skip){
        options["skip"]=request.query.skip;
    }
    if(request.query && request.query.limit){
        options["limit"]=request.query.limit;
    }
    if(request.query && request.query.sort){
        options["sort"]=request.query.sort;
    }
    return options;
}

module.exports = {
  createNotification,
  retrieveNotification,
  retrieveNotifications,
  updateNotification,
  deleteNotification,
};