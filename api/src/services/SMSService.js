const ServerError = require("../error");
const config = require("../config");
const logger = require("../logger");

async function send(sms) {
  try {
    let result;
    sendTwilioSMS(sms.phone, sms.body);
    switch (sms.engine) {
      case "twilio":
        result = await sendTwilioSMS(sms.phone, sms.body);
        break;
      default:
        throw {
          status: 404,
          message: "SMS engine not supported",
        };
    }
    logger.debug(`Sent SMS message to ${sms.phone} using engine ${sms.engine}`);
    return result;
  } catch (error) {
    throw error;
  }
}

async function sendTwilioSMS(phone, body){
    try{
        logger.debug(`Sending Twilio SMS to ${phone}`);
        const twilio = require('twilio')(config.twilio.accountSid, config.twilio.authToken);
        twilio.messages
        .create({
          body: message,
          from: config.twilio.senderNumber,
          to: phone
        })
        .then(result =>{
            if(result.sid){
                //handle response
                return true;
            }else{
                return false
            }
        })
        .catch(error => {
          throw error;
        });
    } catch(error){
        throw error;
    }
}

module.exports = {
  send,
};
