const config = require("./config");
const logger = require("./logger");
const ServerError = require("./error");

module.exports = async (service, func, payload) => {
  let ret;

  //TODO transfer here omnixell dispatcher logic 
  let a = config;

  //call the actual function in the provider
  if (config.services && config.services[service] && config.services[service].provider) {
    try {
      const providerName = config.services[service].provider;
      const provider = require(`./providers/${service}/${providerName}`);
      
      //TODO we should retrieve configuration for the current service in a much smarter way
      const configuration = (config.services[service].configuration) ? config.services[service].configuration : {};

      //Actually callling the provider that implements the service
      ret = await provider[func](payload, configuration);
    } catch (e) {
      throw (e);
    }
  } else {
    throw new ServerError({message: `missing configuration for service ${service}`})
  }
  return ret;
}
