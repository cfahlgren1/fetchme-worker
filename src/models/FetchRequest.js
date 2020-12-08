const mongoose = require("mongoose");

// Create MongoDB Fetch Me Request Schema
const FetchRequest = new mongoose.Schema(
  {
    hash: {
      type: String,
      required: true,
      index: true,
    },
    url: {
      type: String,
      index: true,
      required: true,
    },
    size: {
      type: Number,
    },
    response: {
      type: String,
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

FetchRequest.plugin(uniqueValidator, { message: "is already taken." });

const FetchRequest = mongoose.model("FetchRequest", FetchRequestSchema);
export default FetchRequest;
