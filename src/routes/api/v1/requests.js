"use strict";
const express = require("express");
const router = express.Router();

// import mongoose models
const FetchRequest = require("../../../models/FetchRequest");
const User = require("../../../models/User");

// @route     GET api/v1/request/:id
// @ desc     GET specific request by id
// @access    Public
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const fetchRequests = await FetchRequest.find({ hash: id }); // search for request with given id
    res.json(fetchRequests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET api/v1/requests/:id
// @ desc     GET specific request by userid
// @access    Public
router.get("/user/:id", async (req, res) => {
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
