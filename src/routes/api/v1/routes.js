"use strict";
var router = require("express").Router();

router.get("/", function (req, res) {
  res.send("FetchMe API V1");
});

router.get("/:id", function (req, res) {
  const id = req.params.id;
  res.json({ id });
});

module.exports = router;
