/***********************************************************************************
 * The CollectionsService file implements the service to access data on mongodb
 */

const ServerError = require("../error");
const config = require("../config");
const logger = require("../logger");
const ipfs=require("../utils/ipfs");  //TODO we have to remove it!
const storage = require("./storage"); //TODO this should be added ONLY if create/update are multipart with file uploads that need to be stored somewhere

//Additional Services
//nothing really

//Standard entity model
const Collection = require("../models/Collection");

//Additional Models


/*****************************
* Creates a new Collection 
*
* body Collection
* returns Collection
**/
async function createCollection (data, user) {
  try {
    logger.silly(`[Service createCollection] input`, data);

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
    
    const result = await Collection.create(data);
    logger.silly(`[Service createCollection] output`, result);

    return result;
  } catch (error) {
    throw error;
  }
};



/*****************************
* Retrieves a single Collection 
*
* body Collection
* returns Collection
**/
async function retrieveCollection (data, user) {
  try {
    logger.silly(`[Service retrieveCollection] input`, data);

    const result = await Collection.findOne({
      _id: data.id
    });
    logger.silly(`[Service retrieveCollection] output`, result);

    return result;
  } catch (error) {
    throw error;
  }
};


/*****************************
* Retrieves a set of Collections 
*
* data: Collection
* user: current user
* options: an object containing the following options
*   skip: integer for pagination
*   limit: integer for pagination
*   sort: object with definitions like {updatedAt: -1}
*
* returns Collection
**/
async function retrievesCollection (data, user, options = null) {
  try {
    logger.silly(`[Service retrievesCollection] input`, data);

    //enabling filtering, sorting and paging
    const skip = (options && options.skip > 0) ? options.skip : 0;
    const limit = (options && options.limit > 0) ? ((options.limit > 100) ? 100 : options.limit) : 0;
    const sort = (options && options.sort) ? options.sort : {};
    let filter = {};

    const result = await Collection.find(filter)
      .limit(limit)
      .skip(skip)
      
      .sort(sort)  
      .exec();

      logger.silly(`[Service retrieveCollections] output`, result);
      return result;
  } catch (error) {
    throw error;
  }
};



/*****************************
* Updates a single Collection 
*
* body Collection
* returns Collection
**/
async function updateCollection (entity, data, user) {
  try {
    logger.silly(`[Service updateCollection] input`, data);
    
    if(entity.ownerId!=user.id){
      throw {
          status: 403,
          message: "This entity does not belong to this user",
        };
    }
    entity.set(data);
    const result = await entity.save();
    logger.silly(`[Service updateCollection] output`, result);

    return result;
  } catch (error) {
    throw error;
  }
};

/*****************************
* Deletes a single Collection 
*
* body Collection
* returns Collection
**/
async function deleteCollection (data, user) {
  try {
    logger.silly(`[Service deleteCollection] input`, data);
    let result = await Collection.findOne({
      _id: data
    });
    if (result.ownerId.toString() != user.id) {
      throw new ServerError({
          status: 403,
          message: "This entity does not belong to this user",
        });
    }
    result = await Collection.findOneAndDelete({_id: data});
    logger.silly(`[Service deleteCollection] output`, result);

    return result;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  createCollection,
  retrieveCollection,
  retrievesCollection,
  updateCollection,
  deleteCollection,
};