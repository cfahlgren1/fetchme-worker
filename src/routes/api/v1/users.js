const express = require("express");
const router = express.Router();

// @route     GET api/v1/users/
// @ desc     Get list of users on team and team information
// @access    Private
router.get("/", (req, res) => {
  res.send("Users Route");
});

// @route     GET api/v1/users/teamid
// @ desc     Get list of users on team and team information
// @access    Private
router.get("/:id", (req, res) => {
  const teamid = req.params.id;
  res.send({ team: teamid });
});

module.exports = router;
