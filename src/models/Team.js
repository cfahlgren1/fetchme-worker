const mongoose = require("mongoose");

// Create MongoDB Team Schema
const Team = new mongoose.Schema(
  {
    teamid: {
      type: String,
      index: true,
      required: true,
    },
    // premium field to interact with Stripe
    premium: {
      type: String,
      required: true,
    },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// if team is deleted, delete all users associated with user
userSchema.pre("remove", function (next) {
  this.model("User").deleteMany({ user: this._id }, next);
});

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

const User = mongoose.model("User", UserSchema);
export default User;
