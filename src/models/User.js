const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  premium: {
    type: Boolean,
    default: false,
  },
  requests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FetchRequest",
    },
  ],
});

module.exports = User = mongoose.model("user", UserSchema);
