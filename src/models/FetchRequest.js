const mongoose = require("mongoose");

const FetchRequestSchema = new mongoose.Schema({
  hash: {
    index: true,
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = FetchRequest = mongoose.model(
  "fetchrequest",
  FetchRequestSchema
);
