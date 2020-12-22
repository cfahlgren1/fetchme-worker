const makeRequest = require("./makeRequest");
const dbService = require("../db/createService");
const { sendWebhook } = require("../slack/sendWebhook");

/**
 * Process slack kafka message and send Slack
 * @param  {Object} message
 * @return {JSON} response
 */
const processMessage = async (message) => {
  // make request with url and options
  console.clear();
  const response = await makeRequest(message.args.url, message.options);

  // check if team/user exists, or create it
  await dbService.checkorCreateTeam(message.args);
  const user = await dbService.checkorCreateUser(message.args);
  console.log(message);
  await dbService.createFetchRequest(
    message.args,
    message.options,
    response,
    user[0]
  );
};

module.exports = processMessage;
