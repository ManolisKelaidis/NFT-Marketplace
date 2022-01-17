/***************************************************************************
 * The AssetsController file implements the controller, i.e.:
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
const AssetsService = require("../services/AssetsService");

//Additional Services
//nothing really

/*****************************
* Creates a new Asset 
*
* body Asset
* returns Asset
**/ 
const createAsset = async (req, res, next) => {
  try {
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller createAsset] reqData`, reqData);

  /*  let type = "create";
    let checkParam = await AssetsService.checkParams(req.params, type);
    if (!checkParam) {
        throw new ServerError({
            code: 405,
            message: "No entry found",
        });
    } */
    
    // TODO: ADDITIONAL VALIDATION
    
    // TODO: IMPLEBMENT BUSINESS LOGIC

    let asset = await AssetsService.createAsset(
      reqData.body,
      reqData.user
    );
    if (!asset) {
      throw new ServerError({
        code: 400,
        message: "Unable to create a Asset",
      });
    }
    logger.debug(`[createAsset] Entity created!`, asset);

    // ATTACH RESPONSE DATA
    res.locals.data = asset;
    next();
  } catch (error) {
    next(error);
  }
};

/*****************************
* Retrieves a single Asset 
*
* Asset String
* returns Asset
**/ 
const retrieveAsset = async (req, res, next) => {
  try {
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller retrieveAsset] reqData`, reqData);

    /*let type = "retrieve";
    let checkParam = await AssetsService.checkParams(req.params, type);
    if (!checkParam) {
        throw new ServerError({
            code: 405,
            message: "No entry found",
        });
    }*/

    // TODO: ADDITIONAL VALIDATION
    
    // TODO: IMPLEBMENT BUSINESS LOGIC

    const asset = await AssetsService.retrieveAsset({
      id: reqData.assetId,
    });
    if (!asset) {
      throw new ServerError({
        code: 404  // NOT FOUND
      });
    }
    logger.debug(`[retrieveAsset] Asset retrieved!`, asset);
    
    // ATTACH RESPONSE DATA
    res.locals.data = asset;
    next();
  } catch (error) {
    next(error);
  }
};


/*****************************
* Retrieves a set of Assets 
*
* Asset String
* returns Asset[]
**/ 
const retrieveAssets = async (req, res, next) => {
  try {
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller retrieveAssets] reqData`, reqData);

    /*let type = "retrieves";
    let checkParam = await AssetsService.checkParams(req.params, type);
    if (!checkParam) {
        throw new ServerError({
            code: 405,
            message: "No entry found",
        });
    }*/

    // TODO: ADDITIONAL VALIDATION
    
    // TODO: IMPLEBMENT BUSINESS LOGIC

    // TODO: Are we able to build a different filter object than simply passing reqData?
    
    const assets = await AssetsService.retrievesAsset({
      filter: reqData
    },
    null,
    generateOptions(req));
    if (!assets) {
      assets = [];
    }
    logger.debug(`[retrieveAssets] Assets retrieved!`, assets);
    
    // ATTACH RESPONSE DATA
    res.locals.data = assets;
    next();
  } catch (error) {
    next(error);
  }
};


/*****************************
* Updates a single Asset 
*
* body Asset
* returns Asset
**/
const updateAsset = async (req, res, next) => {
  try { 
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller updateAsset] reqData`, reqData);

    /*let type = "update";
    let checkParam = await AssetsService.checkParams(req.params, type);
    if (!checkParam) {
        throw new ServerError({
            code: 405,
            message: "No entry found",
        });
    }*/
    
    // TODO: ADDITIONAL VALIDATION
    
    // TODO: IMPLEBMENT BUSINESS LOGIC


    //Check if the asset exists
    const asset = await AssetsService.retrieveAsset({
      id: reqData.assetId,
    });
    if (!asset) {
      throw new ServerError({
        code: 404  // NOT FOUND
      });
    }
    logger.debug(`[updateAsset] Asset retrieved!`, asset);

    const updatedAsset = await AssetsService.updateAsset(
      asset,
      reqData.body,
      reqData.user
    );
    if (!updatedAsset) {
      throw new ServerError({
        code: 400,
        message: "Unable to update a Asset",
      });
    }
    logger.debug(`[updateAsset] Entity updated!`, updatedAsset);

    // ATTACH RESPONSE DATA
    res.locals.data = updatedAsset;
    next();
  } catch (error) {
    next(error);
  }
};



/*****************************
* Deletes a single Asset 
*
* body Asset
* returns nothing
**/ 
const deleteAsset = async (req, res, next) => {
  try {
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller deleteAsset] reqData`, reqData);

    /*let type = "delete";
    let checkParam = await AssetsService.checkParams(req.params, type);
    if (!checkParam) {
        throw new ServerError({
            code: 405,
            message: "No entry found",
        });
    }*/

    // TODO: ADDITIONAL VALIDATION

    // TODO: IMPLEBMENT BUSINESS LOGIC

    //Check if the asset exists
    const asset = await AssetsService.retrieveAsset({
      id: reqData.assetId,
    });
    if (!asset) {
      throw new ServerError({
        code: 404  // NOT FOUND
      });
    }
    logger.debug(`[deleteAsset] Asset retrieved!`, asset);

    const deletedAsset = await AssetsService.deleteAsset(
      reqData.assetId,
      reqData.user
    );
    if (!deletedAsset) {
      throw new ServerError({
        code: 400,
        message: "Unable to delete a Asset",
      });
    }
    logger.debug(`[deleteAsset] Entity deleted!`, deletedAsset);

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
  createAsset,
  retrieveAsset,
  retrieveAssets,
  updateAsset,
  deleteAsset,
};