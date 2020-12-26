const makeRequest = require("./makeRequest");
const createService = require("../db/createService");
const { sendWebhook } = require("../slack/sendWebhook");

/**
 * Process slack kafka message and send Slack
 * @param  {Object} message
 * @return {JSON} response
 */
const processMessage = async (message) => {
  // make request with url and options
  const response = await makeRequest(message.args.url, message.options);

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
