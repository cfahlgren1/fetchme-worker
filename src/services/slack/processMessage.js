const makeRequest = require("./makeRequest");
const createService = require("../db/createService");
const findService = require("../db/findService");
const { sendWebhook } = require("../slack/sendWebhook");
const { db } = require("../../models/User");

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
  await createService.checkorCreateTeam(message.args);
  const user = await createService.checkorCreateUser(message.args);
  console.log(message);
  await createService.createFetchRequest(
    message.args,
    message.options,
    response,
    user[0]
  );
};

module.exports = processMessage;
