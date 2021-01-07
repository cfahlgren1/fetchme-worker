const User = require("../../models/User");
const FetchRequest = require("../../models/FetchRequest");

/**
 *  Find User FetchRequests by user given userid
 * @param  {String} userObjectId
 */
const findUserRequests = async (userid) => {
  // find user given by userid
  const user = await User.find({ userid: userid }).limit(1);

  // if returned user, retrieve objectid and find fetch requests
  if (user.length > 0) {
    const userObjectId = user[0]._id;
    return await FetchRequest.find({ user: userObjectId }).populate("user");
  }
  return [];
};

module.exports = { findUserRequests };
