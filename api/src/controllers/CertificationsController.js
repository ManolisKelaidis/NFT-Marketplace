/***************************************************************************
 * The CertificationsController file implements the controller, i.e.:
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
const CertificationsService = require("../services/CertificationsService");

//Additional Services
//nothing really

/*****************************
* Creates a new Certification 
*
* body Certification
* returns Certification
**/ 
const createCertification = async (req, res, next) => {
  try {
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller createCertification] reqData`, reqData);

  /*  let type = "create";
    let checkParam = await CertificationsService.checkParams(req.params, type);
    if (!checkParam) {
        throw new ServerError({
            code: 405,
            message: "No entry found",
        });
    } */
    
    // TODO: ADDITIONAL VALIDATION
    
    // TODO: IMPLEBMENT BUSINESS LOGIC

    let certification = await CertificationsService.createCertification(
      reqData.body,
      reqData.user
    );
    if (!certification) {
      throw new ServerError({
        code: 400,
        message: "Unable to create a Certification",
      });
    }
    logger.debug(`[createCertification] Entity created!`, certification);

    // ATTACH RESPONSE DATA
    res.locals.data = certification;
    next();
  } catch (error) {
    next(error);
  }
};

/*****************************
* Retrieves a single Certification 
*
* Certification String
* returns Certification
**/ 
const retrieveCertification = async (req, res, next) => {
  try {
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller retrieveCertification] reqData`, reqData);

    /*let type = "retrieve";
    let checkParam = await CertificationsService.checkParams(req.params, type);
    if (!checkParam) {
        throw new ServerError({
            code: 405,
            message: "No entry found",
        });
    }*/

    // TODO: ADDITIONAL VALIDATION
    
    // TODO: IMPLEBMENT BUSINESS LOGIC

    const certification = await CertificationsService.retrieveCertification({
      id: reqData.certificationId,
    });
    if (!certification) {
      throw new ServerError({
        code: 404  // NOT FOUND
      });
    }
    logger.debug(`[retrieveCertification] Certification retrieved!`, certification);
    
    // ATTACH RESPONSE DATA
    res.locals.data = certification;
    next();
  } catch (error) {
    next(error);
  }
};


/*****************************
* Retrieves a set of Certifications 
*
* Certification String
* returns Certification[]
**/ 
const retrieveCertifications = async (req, res, next) => {
  try {
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller retrieveCertifications] reqData`, reqData);

    /*let type = "retrieves";
    let checkParam = await CertificationsService.checkParams(req.params, type);
    if (!checkParam) {
        throw new ServerError({
            code: 405,
            message: "No entry found",
        });
    }*/

    // TODO: ADDITIONAL VALIDATION
    
    // TODO: IMPLEBMENT BUSINESS LOGIC

    // TODO: Are we able to build a different filter object than simply passing reqData?
    
    const certifications = await CertificationsService.retrievesCertification({
      filter: reqData
    },
    null,
    generateOptions(req));
    if (!certifications) {
      certifications = [];
    }
    logger.debug(`[retrieveCertifications] Certifications retrieved!`, certifications);
    
    // ATTACH RESPONSE DATA
    res.locals.data = certifications;
    next();
  } catch (error) {
    next(error);
  }
};


/*****************************
* Updates a single Certification 
*
* body Certification
* returns Certification
**/
const updateCertification = async (req, res, next) => {
  try { 
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller updateCertification] reqData`, reqData);

    /*let type = "update";
    let checkParam = await CertificationsService.checkParams(req.params, type);
    if (!checkParam) {
        throw new ServerError({
            code: 405,
            message: "No entry found",
        });
    }*/
    
    // TODO: ADDITIONAL VALIDATION
    
    // TODO: IMPLEBMENT BUSINESS LOGIC


    //Check if the certification exists
    const certification = await CertificationsService.retrieveCertification({
      id: reqData.certificationId,
    });
    if (!certification) {
      throw new ServerError({
        code: 404  // NOT FOUND
      });
    }
    logger.debug(`[updateCertification] Certification retrieved!`, certification);

    const updatedCertification = await CertificationsService.updateCertification(
      certification,
      reqData.body,
      reqData.user
    );
    if (!updatedCertification) {
      throw new ServerError({
        code: 400,
        message: "Unable to update a Certification",
      });
    }
    logger.debug(`[updateCertification] Entity updated!`, updatedCertification);

    // ATTACH RESPONSE DATA
    res.locals.data = updatedCertification;
    next();
  } catch (error) {
    next(error);
  }
};



/*****************************
* Deletes a single Certification 
*
* body Certification
* returns nothing
**/ 
const deleteCertification = async (req, res, next) => {
  try {
    // RETRIEVE AND VALIDATE REQ BODY & PARAMS
    let reqData = Controller.collectRequestParams(req);
    logger.silly(`[Controller deleteCertification] reqData`, reqData);

    /*let type = "delete";
    let checkParam = await CertificationsService.checkParams(req.params, type);
    if (!checkParam) {
        throw new ServerError({
            code: 405,
            message: "No entry found",
        });
    }*/

    // TODO: ADDITIONAL VALIDATION

    // TODO: IMPLEBMENT BUSINESS LOGIC

    //Check if the certification exists
    const certification = await CertificationsService.retrieveCertification({
      id: reqData.certificationId,
    });
    if (!certification) {
      throw new ServerError({
        code: 404  // NOT FOUND
      });
    }
    logger.debug(`[deleteCertification] Certification retrieved!`, certification);

    const deletedCertification = await CertificationsService.deleteCertification(
      reqData.certificationId,
      reqData.user
    );
    if (!deletedCertification) {
      throw new ServerError({
        code: 400,
        message: "Unable to delete a Certification",
      });
    }
    logger.debug(`[deleteCertification] Entity deleted!`, deletedCertification);

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
  createCertification,
  retrieveCertification,
  retrieveCertifications,
  updateCertification,
  deleteCertification,
};