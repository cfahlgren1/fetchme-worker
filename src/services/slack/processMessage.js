const makeRequest = require("./makeRequest");
const createService = require("../db/createService");
const { sendWebhook, sendErrorWebhook } = require("../slack/sendWebhook");

/**
 * Process slack kafka message and send Slack
 * @param  {Object} message
 * @return {JSON} response
 */
const processMessage = async (message) => {
  // make request with url and options
  const response = await makeRequest(message.args.url, message.options);

  // if node-fetch had an error, send error message to user
  if (response.status === undefined) {
    sendErrorWebhook(message.args.response_url, message.args.text);
  }

  // check if team/user exists, or create it
  await createService.checkorCreateTeam(message.args);
  const user = await createService.checkorCreateUser(message.args);

  // create fetch request in database
  const fetchRequest = await createService.createFetchRequest(
    message.args,
    message.options,
    response,
    user
  );

  // send webhook to slack
  sendWebhook(fetchRequest, message.args.response_url);
};

module.exports = processMessage;
