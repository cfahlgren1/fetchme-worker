const User = require("../../models/User");
const Team = require("../../models/Team");

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
    const team = await Team.findOneAndUpdate(
      { teamid: team_id },
      { $push: { members: userObjectId } },
      { new: true }
    );
    console.log(`Created ${user_id} and added to team: ${team_id}`);
    return newUser;
  }
  return user;
};

/**
 * Delete team by teamid
 * @param  {String} teamid
 */
const deleteTeam = async (teamid) => {
  await Team.deleteOne({ teamid: teamid });
};
/**
 * Delete user by userid
 * @param  {String} userid
 */
const deleteUser = async (userid) => {
  await User.deleteOne({ userid: userid });
};
/**
 * Find team members through join
 * @param  {String} teamid
 */
const findTeamMembers = async (teamid) => {
  return await Team.find({ teamid: teamid }).populate("members");
};
module.exports = {
  checkorCreateUser,
  checkorCreateTeam,
  deleteTeam,
  deleteUser,
  findTeamMembers,
};
