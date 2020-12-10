"use strict";
const express = require("express");
const router = express.Router();

// @route     GET api/v1/requests/
// @ desc     GET Specific Request Page
// @access    Public
router.get("/", (req, res) => {
  res.send("Request Route /");
});

// @route     GET api/v1/requests/:id
// @ desc     GET Specific Request Page
// @access    Public
router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send({ request: id });
});

module.exports = router;
