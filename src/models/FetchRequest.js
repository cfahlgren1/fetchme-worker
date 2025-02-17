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
  method: {
    type: String,
  },
  status: {
    type: String,
  },
  options: {
    type: String,
  },
  response: {
    type: String,
    required: true,
  },
  response_type: {
    type: String,
    default: "text/html",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const FetchRequest = mongoose.model("fetchrequest", FetchRequestSchema);

module.exports = FetchRequest;
