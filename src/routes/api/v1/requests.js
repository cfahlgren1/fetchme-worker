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
    const fetchRequests = await FetchRequest.find({ hash: id }).select("-_id"); // search for request with given id
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(fetchRequests[0], null, 4));
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

  // find user given by userid
  const user = await User.find({ userid: id }).limit(1);

  // if returned user, retrieve objectid and find fetch requests
  if (user.length > 0) {
    const userObjectId = user[0]._id;
    const fetchRequests = await FetchRequest.find({ user: userObjectId })
      .populate("user")
      .select("-response -_id");
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(fetchRequests, null, 4));
    return;
  }
  res.json([]);
});

module.exports = router;
