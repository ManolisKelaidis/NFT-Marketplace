/***************************************************************************
 * The BidsController file implements the controller, i.e.:
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
const BidsService = require("../services/BidsService");

//Additional Services
//nothing really

/*****************************
* Creates a new Bid 
*
* body Bid
* returns Bid
**/ 
const createBid = async (req, res, next) => {
  try {
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller createBid] reqData`, reqData);

  /*  let type = "create";
    let checkParam = await BidsService.checkParams(req.params, type);
    if (!checkParam) {
        throw new ServerError({
            code: 405,
            message: "No entry found",
        });
    } */
    
    // TODO: ADDITIONAL VALIDATION
    
    // TODO: IMPLEBMENT BUSINESS LOGIC

    let bid = await BidsService.createBid(
      reqData.body,
      reqData.user
    );
    if (!bid) {
      throw new ServerError({
        code: 400,
        message: "Unable to create a Bid",
      });
    }
    logger.debug(`[createBid] Entity created!`, bid);

    // ATTACH RESPONSE DATA
    res.locals.data = bid;
    next();
  } catch (error) {
    next(error);
  }
};

/*****************************
* Retrieves a single Bid 
*
* Bid String
* returns Bid
**/ 
const retrieveBid = async (req, res, next) => {
  try {
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller retrieveBid] reqData`, reqData);

    /*let type = "retrieve";
    let checkParam = await BidsService.checkParams(req.params, type);
    if (!checkParam) {
        throw new ServerError({
            code: 405,
            message: "No entry found",
        });
    }*/

    // TODO: ADDITIONAL VALIDATION
    
    // TODO: IMPLEBMENT BUSINESS LOGIC

    const bid = await BidsService.retrieveBid({
      id: reqData.bidId,
    });
    if (!bid) {
      throw new ServerError({
        code: 404  // NOT FOUND
      });
    }
    logger.debug(`[retrieveBid] Bid retrieved!`, bid);
    
    // ATTACH RESPONSE DATA
    res.locals.data = bid;
    next();
  } catch (error) {
    next(error);
  }
};


/*****************************
* Retrieves a set of Bids 
*
* Bid String
* returns Bid[]
**/ 
const retrieveBids = async (req, res, next) => {
  try {
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller retrieveBids] reqData`, reqData);

    /*let type = "retrieves";
    let checkParam = await BidsService.checkParams(req.params, type);
    if (!checkParam) {
        throw new ServerError({
            code: 405,
            message: "No entry found",
        });
    }*/

    // TODO: ADDITIONAL VALIDATION
    
    // TODO: IMPLEBMENT BUSINESS LOGIC

    // TODO: Are we able to build a different filter object than simply passing reqData?
    
    const bids = await BidsService.retrievesBid({
      filter: reqData
    },
    null,
    generateOptions(req));
    if (!bids) {
      bids = [];
    }
    logger.debug(`[retrieveBids] Bids retrieved!`, bids);
    
    // ATTACH RESPONSE DATA
    res.locals.data = bids;
    next();
  } catch (error) {
    next(error);
  }
};


/*****************************
* Updates a single Bid 
*
* body Bid
* returns Bid
**/
const updateBid = async (req, res, next) => {
  try { 
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller updateBid] reqData`, reqData);

    /*let type = "update";
    let checkParam = await BidsService.checkParams(req.params, type);
    if (!checkParam) {
        throw new ServerError({
            code: 405,
            message: "No entry found",
        });
    }*/
    
    // TODO: ADDITIONAL VALIDATION
    
    // TODO: IMPLEBMENT BUSINESS LOGIC


    //Check if the bid exists
    const bid = await BidsService.retrieveBid({
      id: reqData.bidId,
    });
    if (!bid) {
      throw new ServerError({
        code: 404  // NOT FOUND
      });
    }
    logger.debug(`[updateBid] Bid retrieved!`, bid);

    const updatedBid = await BidsService.updateBid(
      bid,
      reqData.body,
      reqData.user
    );
    if (!updatedBid) {
      throw new ServerError({
        code: 400,
        message: "Unable to update a Bid",
      });
    }
    logger.debug(`[updateBid] Entity updated!`, updatedBid);

    // ATTACH RESPONSE DATA
    res.locals.data = updatedBid;
    next();
  } catch (error) {
    next(error);
  }
};



/*****************************
* Deletes a single Bid 
*
* body Bid
* returns nothing
**/ 
const deleteBid = async (req, res, next) => {
  try {
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller deleteBid] reqData`, reqData);

    /*let type = "delete";
    let checkParam = await BidsService.checkParams(req.params, type);
    if (!checkParam) {
        throw new ServerError({
            code: 405,
            message: "No entry found",
        });
    }*/

    // TODO: ADDITIONAL VALIDATION

    // TODO: IMPLEBMENT BUSINESS LOGIC

    //Check if the bid exists
    const bid = await BidsService.retrieveBid({
      id: reqData.bidId,
    });
    if (!bid) {
      throw new ServerError({
        code: 404  // NOT FOUND
      });
    }
    logger.debug(`[deleteBid] Bid retrieved!`, bid);

    const deletedBid = await BidsService.deleteBid(
      reqData.bidId,
      reqData.user
    );
    if (!deletedBid) {
      throw new ServerError({
        code: 400,
        message: "Unable to delete a Bid",
      });
    }
    logger.debug(`[deleteBid] Entity deleted!`, deletedBid);

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
  createBid,
  retrieveBid,
  retrieveBids,
  updateBid,
  deleteBid,
};