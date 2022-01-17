/***************************************************************************
 * The CollectionsController file implements the controller, i.e.:
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
const CollectionsService = require("../services/CollectionsService");

//Additional Services
//nothing really

/*****************************
* Creates a new Collection 
*
* body Collection
* returns Collection
**/ 
const createCollection = async (req, res, next) => {
  try {
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller createCollection] reqData`, reqData);

  /*  let type = "create";
    let checkParam = await CollectionsService.checkParams(req.params, type);
    if (!checkParam) {
        throw new ServerError({
            code: 405,
            message: "No entry found",
        });
    } */
    
    // TODO: ADDITIONAL VALIDATION
    
    // TODO: IMPLEBMENT BUSINESS LOGIC

    let collection = await CollectionsService.createCollection(
      reqData.body,
      reqData.user
    );
    if (!collection) {
      throw new ServerError({
        code: 400,
        message: "Unable to create a Collection",
      });
    }
    logger.debug(`[createCollection] Entity created!`, collection);

    // ATTACH RESPONSE DATA
    res.locals.data = collection;
    next();
  } catch (error) {
    next(error);
  }
};

/*****************************
* Retrieves a single Collection 
*
* Collection String
* returns Collection
**/ 
const retrieveCollection = async (req, res, next) => {
  try {
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller retrieveCollection] reqData`, reqData);

    /*let type = "retrieve";
    let checkParam = await CollectionsService.checkParams(req.params, type);
    if (!checkParam) {
        throw new ServerError({
            code: 405,
            message: "No entry found",
        });
    }*/

    // TODO: ADDITIONAL VALIDATION
    
    // TODO: IMPLEBMENT BUSINESS LOGIC

    const collection = await CollectionsService.retrieveCollection({
      id: reqData.collectionId,
    });
    if (!collection) {
      throw new ServerError({
        code: 404  // NOT FOUND
      });
    }
    logger.debug(`[retrieveCollection] Collection retrieved!`, collection);
    
    // ATTACH RESPONSE DATA
    res.locals.data = collection;
    next();
  } catch (error) {
    next(error);
  }
};


/*****************************
* Retrieves a set of Collections 
*
* Collection String
* returns Collection[]
**/ 
const retrieveCollections = async (req, res, next) => {
  try {
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller retrieveCollections] reqData`, reqData);

    /*let type = "retrieves";
    let checkParam = await CollectionsService.checkParams(req.params, type);
    if (!checkParam) {
        throw new ServerError({
            code: 405,
            message: "No entry found",
        });
    }*/

    // TODO: ADDITIONAL VALIDATION
    
    // TODO: IMPLEBMENT BUSINESS LOGIC

    // TODO: Are we able to build a different filter object than simply passing reqData?
    
    const collections = await CollectionsService.retrievesCollection({
      filter: reqData
    },
    null,
    generateOptions(req));
    if (!collections) {
      collections = [];
    }
    logger.debug(`[retrieveCollections] Collections retrieved!`, collections);
    
    // ATTACH RESPONSE DATA
    res.locals.data = collections;
    next();
  } catch (error) {
    next(error);
  }
};


/*****************************
* Updates a single Collection 
*
* body Collection
* returns Collection
**/
const updateCollection = async (req, res, next) => {
  try { 
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller updateCollection] reqData`, reqData);

    /*let type = "update";
    let checkParam = await CollectionsService.checkParams(req.params, type);
    if (!checkParam) {
        throw new ServerError({
            code: 405,
            message: "No entry found",
        });
    }*/
    
    // TODO: ADDITIONAL VALIDATION
    
    // TODO: IMPLEBMENT BUSINESS LOGIC


    //Check if the collection exists
    const collection = await CollectionsService.retrieveCollection({
      id: reqData.collectionId,
    });
    if (!collection) {
      throw new ServerError({
        code: 404  // NOT FOUND
      });
    }
    logger.debug(`[updateCollection] Collection retrieved!`, collection);

    const updatedCollection = await CollectionsService.updateCollection(
      collection,
      reqData.body,
      reqData.user
    );
    if (!updatedCollection) {
      throw new ServerError({
        code: 400,
        message: "Unable to update a Collection",
      });
    }
    logger.debug(`[updateCollection] Entity updated!`, updatedCollection);

    // ATTACH RESPONSE DATA
    res.locals.data = updatedCollection;
    next();
  } catch (error) {
    next(error);
  }
};



/*****************************
* Deletes a single Collection 
*
* body Collection
* returns nothing
**/ 
const deleteCollection = async (req, res, next) => {
  try {
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller deleteCollection] reqData`, reqData);

    /*let type = "delete";
    let checkParam = await CollectionsService.checkParams(req.params, type);
    if (!checkParam) {
        throw new ServerError({
            code: 405,
            message: "No entry found",
        });
    }*/

    // TODO: ADDITIONAL VALIDATION

    // TODO: IMPLEBMENT BUSINESS LOGIC

    //Check if the collection exists
    const collection = await CollectionsService.retrieveCollection({
      id: reqData.collectionId,
    });
    if (!collection) {
      throw new ServerError({
        code: 404  // NOT FOUND
      });
    }
    logger.debug(`[deleteCollection] Collection retrieved!`, collection);

    const deletedCollection = await CollectionsService.deleteCollection(
      reqData.collectionId,
      reqData.user
    );
    if (!deletedCollection) {
      throw new ServerError({
        code: 400,
        message: "Unable to delete a Collection",
      });
    }
    logger.debug(`[deleteCollection] Entity deleted!`, deletedCollection);

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
  createCollection,
  retrieveCollection,
  retrieveCollections,
  updateCollection,
  deleteCollection,
};