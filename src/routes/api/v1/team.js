const express = require("express");
const router = express.Router();

const Team = require("../../../models/Team");

// @route     GET api/v1/team/:id
// @ desc     Get team information by id
// @access    Private
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const teams = await Team.find({ teamid: id });
    res.json(teams);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;