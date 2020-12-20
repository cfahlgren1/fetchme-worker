const User = require("../../models/User");
const Team = require("../../models/Team");

/**
 * Will create team or user in DB if needed
 * @param  {Object} slackMessage
 */
const checkorCreateTeam = async (slackMessage) => {
  // get team id from slack
  const team_id = slackMessage.team_id;
  const team_domain = slackMessage.team_domain;

  // check if team exists
  const team = await Team.find({ teamid: team_id }).limit(1);

  // if team does not exist create it
  if (team.length === 0) {
    const newTeam = new Team({
      name: team_domain,
      teamid: team_id,
    });
    await newTeam.save();
    console.log("Created team:", team_id);
    return newTeam;
  }
  return team;
};

/**
 * Will create team or user in DB if needed
 * @param  {Object} slackMessage
 */
const checkorCreateUser = async (slackMessage) => {
  // get team id from slack
  const user_id = slackMessage.user_id;
  const user_name = slackMessage.user_name;

  // check if user exists
  const user = await User.find({ userid: user_id }).limit(1);

  // if team does not exist create it
  if (user.length === 0) {
    const newUser = new User({
      userid: user_id,
      name: user_name,
    });
    await newUser.save();
    console.log("Created user:", user_id);
    return newUser;
  }
  return user;
};
module.exports = { checkorCreateUser, checkorCreateTeam };
