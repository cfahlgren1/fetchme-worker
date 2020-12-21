const makeRequest = require("./makeRequest");
const dbService = require("../db/dbService");

/**
 * Process slack kafka message and send Slack
 * @param  {Object} message
 * @return {JSON} response
 */
const processMessage = async (message) => {
  // make request with url and options
  console.clear();
  const response = await makeRequest(message.args.url, message.options);
  console.log(response);

  // check if team/user exists, or create it
  const team = await dbService.checkorCreateTeam(message.args);
  const user = await dbService.checkorCreateUser(message.args);
  const team_members = await dbService.findTeamMembers(message.args.team_id);
  console.log(team, user, team_members);
};

module.exports = processMessage;
