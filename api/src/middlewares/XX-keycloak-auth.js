const keycloak = require("../services/auth/keycloak.js");
const config = require("../config");
const logger = require("../logger");
const ServerError = require("../error.js");
const auth = require("../services/auth");

keycloak.init();

function isPublicEndpoint(req) {
  return (
    req.path.indexOf("/v1/auth/login") > -1 ||
    req.path.indexOf("/v2.1/auth/spid") > -1 ||
    req.path.indexOf("/v1/settings/getMobileConfiguration") > -1 ||
    req.path.indexOf("/v1/device/sendPersonalInformation") > -1 ||
    (req.method === "POST" && req.path.indexOf("/v1/device/deviceInfo") > -1) ||
    (req.method === "POST" && req.path.indexOf("/v1/scan/scanData") > -1)
  );
}

module.exports = (app) => {
  //Decode token passed in Authorization
  app.use(keycloak.get().middleware());

  //Add user data to req
  app.use((req, res, next) => {
    try {
      /*const authHeader = req.header('Authorization');
      let token;

      // console.debug("Authorization Header", authHeader);

      if (!!authHeader && authHeader.startsWith("Bearer ")) {
          // removes "bearer " from the token string
          token = authHeader.substring(7, authHeader.length);
      } else {
          throw new Error("Token not found")
      } */

      //Keycloak Checks the token
      // keycloak.verifyToken(token).then((a) => {
      //   let b = a;
      //   next();
      // });

      const grant = auth.getGrant(req);

      if (req.kauth && req.kauth.grant) {
        //User is authenticated and verified by third party auth service
        let user = {
          username: req.kauth.grant.access_token.content.preferred_username,
          email: req.kauth.grant.access_token.content.email,
          userId: req.kauth.grant.access_token.content.sub,
          type: parseInt(req.kauth.grant.access_token.content.type) || 9,    //TODO probably better to remove default and raise error after
          roles: [], //TODO Add roles management
        };

        if (config.auth.IDP.AA) {
          user.organizations = auth.getAttributeAuthority(req);
          user.fiscalCode = req.kauth.grant.access_token.content.codice_fiscale;
        }
        req.user = user;
      } else {
        //User is not authenticated!
        /*   if (!isPublicEndpoint(req)) {
          throw({code:401});
        } */
      }
      next();
    } catch (e) {
      next(new ServerError(e));
    }
  });
};
