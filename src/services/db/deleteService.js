const User = require("../../models/User");
const Team = require("../../models/Team");
const FetchRequest = require("../../models/FetchRequest");

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
 * Delete team by teamid
 * @param  {String} teamid
 */
const deleteFetchRequest = async (hash) => {
  await FetchRequest.deleteOne({ hash: hash });
};
