const express = require("express");
const router = express.Router();

// import mongoose model
const Team = require("../../../models/Team");

// @route     GET api/v1/teams/
// @ desc     Get list of all teams on fetchme
// @access    Private
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find({});
    res.json(teams);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET api/v1/teams/:id
// @ desc     Get team information by id
// @access    Private
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const teams = await Team.find({ teamid: id }).populate("members");
    res.json(teams);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
