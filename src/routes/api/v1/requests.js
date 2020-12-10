"use strict";
const express = require("express");
const router = express.Router();

const User = require("../../../models/User");

// @route     GET api/v1/requests/:id
// @ desc     GET specific request by userid
// @access    Public
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const fetchRequests = await User.find({ userid: id }).populate("requests"); // search for requests from user with given id
    res.json(fetchRequests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
