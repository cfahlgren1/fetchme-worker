const makeRequest = require("./makeRequest");

/**
 * Process slack kafka message and send Slack
 * @param  {Object} message
 * @return {JSON} response
 */
const processMessage = async(message) => {
  // make request with url and options
  const response = await makeRequest(message.args.url, message.options);
};

module.exports = processMessage;
