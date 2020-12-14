const makeRequest = require("./makeRequest");

/**
 * Process slack kafka message and send Slack
 * @param  {Object} message
 * @return {JSON} response
 */
const processMessage = (message) => {
  // make request with url and options
  makeRequest(message.args.url, message.options);
  console.log(message);
};

module.exports = processMessage;
