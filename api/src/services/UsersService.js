/***********************************************************************************
 * The UsersService file implements the service to access data on mongodb
 */

const ServerError = require("../error");
const config = require("../config");
const logger = require("../logger");
const ipfs=require("../utils/ipfs");  //TODO we have to remove it!
const storage = require("./storage"); //TODO this should be added ONLY if create/update are multipart with file uploads that need to be stored somewhere

//Additional Services
//nothing really

//Standard entity model
const User = require("../models/User");

//Additional Models


/*****************************
* Creates a new User 
*
* body User
* returns User
**/
async function createUser (data, user) {
  try {
    logger.silly(`[Service createUser] input`, data);

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

    data.password=hashPassword(data.password);
    const result = await User.create(data);
    logger.silly(`[Service createUser] output`, result);

    return result;
  } catch (error) {
    throw error;
  }
};

const bcrypt = require("bcryptjs");
function hashPassword(password) {
  const hashedPassword = bcrypt.hashSync(password, config.auth.saltRounds);  //default saltRounds 10
  return hashedPassword;
}


/*****************************
* Retrieves a single User 
*
* body User
* returns User
**/
async function retrieveUser (data, user) {
  try {
    logger.silly(`[Service retrieveUser] input`, data);

    const result = await User.findOne({
      _id: data.id
    }).populate("status.").populate("level.");
    logger.silly(`[Service retrieveUser] output`, result);

    return result;
  } catch (error) {
    throw error;
  }
};


/*****************************
* Retrieves a set of Users 
*
* data: User
* user: current user
* options: an object containing the following options
*   skip: integer for pagination
*   limit: integer for pagination
*   sort: object with definitions like {updatedAt: -1}
*
* returns User
**/
async function retrievesUser (data, user, options = null) {
  try {
    logger.silly(`[Service retrievesUser] input`, data);

    //enabling filtering, sorting and paging
    const skip = (options && options.skip > 0) ? options.skip : 0;
    const limit = (options && options.limit > 0) ? ((options.limit > 100) ? 100 : options.limit) : 0;
    const sort = (options && options.sort) ? options.sort : {};
    let filter = {};

    const result = await User.find(filter)
      .limit(limit)
      .skip(skip)
      .populate("status.").populate("level.")
      .sort(sort)  
      .exec();

      logger.silly(`[Service retrieveUsers] output`, result);
      return result;
  } catch (error) {
    throw error;
  }
};



/*****************************
* Updates a single User 
*
* body User
* returns User
**/
async function updateUser (entity, data, user) {
  try {
    logger.silly(`[Service updateUser] input`, data);
    
      if(data.password)
        data.password=hashPassword(data.password);
    entity.set(data);
    const result = await entity.save();
    logger.silly(`[Service updateUser] output`, result);

    return result;
  } catch (error) {
    throw error;
  }
};

/*****************************
* Deletes a single User 
*
* body User
* returns User
**/
async function deleteUser (data, user) {
  try {
    logger.silly(`[Service deleteUser] input`, data);
    let result = await User.findOne({
      _id: data
    });
    result = await User.findOneAndDelete({_id: data});
    logger.silly(`[Service deleteUser] output`, result);

    return result;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  createUser,
  retrieveUser,
  retrievesUser,
  updateUser,
  deleteUser,
};