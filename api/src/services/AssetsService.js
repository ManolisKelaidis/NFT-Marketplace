/***********************************************************************************
 * The AssetsService file implements the service to access data on mongodb
 */

const ServerError = require("../error");
const config = require("../config");
const logger = require("../logger");
const ipfs=require("../utils/ipfs");  //TODO we have to remove it!
const storage = require("./storage"); //TODO this should be added ONLY if create/update are multipart with file uploads that need to be stored somewhere

//Additional Services
//nothing really

//Standard entity model
const Asset = require("../models/Asset");

//Additional Models


/*****************************
* Creates a new Asset 
*
* body Asset
* returns Asset
**/
async function createAsset (data, user) {
  try {
    logger.silly(`[Service createAsset] input`, data);

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
    
    const result = await Asset.create(data);
    logger.silly(`[Service createAsset] output`, result);

    return result;
  } catch (error) {
    throw error;
  }
};



/*****************************
* Retrieves a single Asset 
*
* body Asset
* returns Asset
**/
async function retrieveAsset (data, user) {
  try {
    logger.silly(`[Service retrieveAsset] input`, data);

    const result = await Asset.findOne({
      _id: data.id
    });
    logger.silly(`[Service retrieveAsset] output`, result);

    return result;
  } catch (error) {
    throw error;
  }
};


/*****************************
* Retrieves a set of Assets 
*
* data: Asset
* user: current user
* options: an object containing the following options
*   skip: integer for pagination
*   limit: integer for pagination
*   sort: object with definitions like {updatedAt: -1}
*
* returns Asset
**/
async function retrievesAsset (data, user, options = null) {
  try {
    logger.silly(`[Service retrievesAsset] input`, data);

    //enabling filtering, sorting and paging
    const skip = (options && options.skip > 0) ? options.skip : 0;
    const limit = (options && options.limit > 0) ? ((options.limit > 100) ? 100 : options.limit) : 0;
    const sort = (options && options.sort) ? options.sort : {};
    let filter = {};

    const result = await Asset.find(filter)
      .limit(limit)
      .skip(skip)
      
      .sort(sort)  
      .exec();

      logger.silly(`[Service retrieveAssets] output`, result);
      return result;
  } catch (error) {
    throw error;
  }
};



/*****************************
* Updates a single Asset 
*
* body Asset
* returns Asset
**/
async function updateAsset (entity, data, user) {
  try {
    logger.silly(`[Service updateAsset] input`, data);
    
    if(entity.ownerId!=user.id){
      throw {
          status: 403,
          message: "This entity does not belong to this user",
        };
    }
    entity.set(data);
    const result = await entity.save();
    logger.silly(`[Service updateAsset] output`, result);

    return result;
  } catch (error) {
    throw error;
  }
};

/*****************************
* Deletes a single Asset 
*
* body Asset
* returns Asset
**/
async function deleteAsset (data, user) {
  try {
    logger.silly(`[Service deleteAsset] input`, data);
    let result = await Asset.findOne({
      _id: data
    });
    if (result.ownerId.toString() != user.id) {
      throw new ServerError({
          status: 403,
          message: "This entity does not belong to this user",
        });
    }
    result = await Asset.findOneAndDelete({_id: data});
    logger.silly(`[Service deleteAsset] output`, result);

    return result;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  createAsset,
  retrieveAsset,
  retrievesAsset,
  updateAsset,
  deleteAsset,
};