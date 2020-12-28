const express = require("express");
const router = express.Router();

// import mongoose model
const Team = require("../../../models/Team");

// @route     GET api/v1/team/
// @ desc     Get list of all teams on fetchme
// @access    Private
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find({}).select("-_id");
    res.json(teams);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET api/v1/team/:id
// @ desc     Get team information by id
// @access    Private
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const teams = await Team.find({ teamid: id }).populate("members");
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(teams, null, 4));
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
