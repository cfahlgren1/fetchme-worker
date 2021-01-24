const User = require("../../models/User");
const Team = require("../../models/Team");
const FetchRequest = require("../../models/FetchRequest");
const uuid4 = require("short-uuid");

/**
 * Will create team in DB if needed
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
 * Will create user in DB if needed
 * @param  {Object} slackMessage
 */
const checkorCreateUser = async (slackMessage) => {
  // get team id from slack
  const user_id = slackMessage.user_id;
  const user_name = slackMessage.user_name;
  const team_id = slackMessage.team_id;

  // check if user exists
  const user = await User.find({ userid: user_id }).limit(1);

  // if team does not exist create it
  if (user.length === 0) {
    const newUser = new User({
      userid: user_id,
      name: user_name,
    });
    await newUser.save();

    const userObjectId = newUser._id;
    // add to team
    await Team.findOneAndUpdate(
      { teamid: team_id },
      { $push: { members: userObjectId } },
      { new: true }
    );
    console.log(`Created ${user_id} and added to team: ${team_id}`);
    return newUser;
  }
  return user[0];
};

/**
 * Create FetchRequest record
 * @param  {Object} slackMessage
 * @param  {String} response
 */
const createFetchRequest = async (slackMessage, options, response, user) => {
  const hash = uuid4.generate();
  const url = slackMessage.url;
  const body = response.body;
  const method = options.method;
  const userArgs = options.headers;
  const status = response.status + " " + response.statusText;

  const newFetchRequest = new FetchRequest({
    hash: hash,
    url: url,
    method: method,
    status: status,
    options: JSON.stringify(userArgs),
    response: body,
    response_type: response.response_type,
    user: user._id,
  });

  const myRequest = await newFetchRequest.save();
  return myRequest;
};

module.exports = {
  checkorCreateUser,
  checkorCreateTeam,
  createFetchRequest,
};
