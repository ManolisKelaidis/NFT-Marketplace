/***********************************************************************************
 * The NotificationsService file implements the service to access data on mongodb
 */

const ServerError = require("../error");
const config = require("../config");
const logger = require("../logger");
const ipfs=require("../utils/ipfs");  //TODO we have to remove it!
const storage = require("./storage"); //TODO this should be added ONLY if create/update are multipart with file uploads that need to be stored somewhere

//Additional Services
//nothing really

//Standard entity model
const Notification = require("../models/Notification");

//Additional Models


/*****************************
* Creates a new Notification 
*
* body Notification
* returns Notification
**/
async function createNotification (data, user) {
  try {
    logger.silly(`[Service createNotification] input`, data);

    //TODO the entire following section should be created from YAML definition and not hardcoded like that
    if(data && data.file){
      data.file = await storage.store(data.file);
    }
    if(data && data.profilePic){
      data.profilePic = data.profilePic.url;
    }
    for(file in data.unencryptedFiles){
      data.unencryptedFiles[file]=await ipfs.uploadFile(data.unencryptedFiles[file]);
    }
    for(file in data.encryptedFiles){
      data.encryptedFiles[file]=await ipfs.uploadText(data.encryptedFiles[file]);
    }

    //Adds ownership
    data.ownerId = user.id;
    
    const result = await Notification.create(data);
    logger.silly(`[Service createNotification] output`, result);

    return result;
  } catch (error) {
    throw error;
  }
};



/*****************************
* Retrieves a single Notification 
*
* body Notification
* returns Notification
**/
async function retrieveNotification (data, user) {
  try {
    logger.silly(`[Service retrieveNotification] input`, data);

    const result = await Notification.findOne({
      _id: data.id
    });
    logger.silly(`[Service retrieveNotification] output`, result);

    return result;
  } catch (error) {
    throw error;
  }
};


/*****************************
* Retrieves a set of Notifications 
*
* data: Notification
* user: current user
* options: an object containing the following options
*   skip: integer for pagination
*   limit: integer for pagination
*   sort: object with definitions like {updatedAt: -1}
*
* returns Notification
**/
async function retrievesNotification (data, user, options = null) {
  try {
    logger.silly(`[Service retrievesNotification] input`, data);

    //enabling filtering, sorting and paging
    const skip = (options && options.skip > 0) ? options.skip : 0;
    const limit = (options && options.limit > 0) ? ((options.limit > 100) ? 100 : options.limit) : 0;
    const sort = (options && options.sort) ? options.sort : {};
    let filter = {};

    const result = await Notification.find(filter)
      .limit(limit)
      .skip(skip)
      
      .sort(sort)  
      .exec();

      logger.silly(`[Service retrieveNotifications] output`, result);
      return result;
  } catch (error) {
    throw error;
  }
};



/*****************************
* Updates a single Notification 
*
* body Notification
* returns Notification
**/
async function updateNotification (entity, data, user) {
  try {
    logger.silly(`[Service updateNotification] input`, data);
    
    if(entity.ownerId!=user.id){
      throw {
          status: 403,
          message: "This entity does not belong to this user",
        };
    }
    entity.set(data);
    const result = await entity.save();
    logger.silly(`[Service updateNotification] output`, result);

    return result;
  } catch (error) {
    throw error;
  }
};

/*****************************
* Deletes a single Notification 
*
* body Notification
* returns Notification
**/
async function deleteNotification (data, user) {
  try {
    logger.silly(`[Service deleteNotification] input`, data);
    let result = await Notification.findOne({
      _id: data
    });
    if (result.ownerId.toString() != user.id) {
      throw new ServerError({
          status: 403,
          message: "This entity does not belong to this user",
        });
    }
    result = await Notification.findOneAndDelete({_id: data});
    logger.silly(`[Service deleteNotification] output`, result);

    return result;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  createNotification,
  retrieveNotification,
  retrievesNotification,
  updateNotification,
  deleteNotification,
};