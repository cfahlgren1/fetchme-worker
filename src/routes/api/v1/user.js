const express = require("express");
const router = express.Router();

// @route     GET api/v1/users/
// @ desc     Get list of users on team and team information
// @access    Private
router.get("/", (req, res) => {
  res.send("User Route");
});

// @route     GET api/v1/user/userid
// @ desc     Get User Information
// @access    Private
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.find({ userid: id }).select("-_id");
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(user, null, 4));
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
