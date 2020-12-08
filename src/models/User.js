const mongoose = require("mongoose");

// Create MongoDB User Schema
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      index: true,
      required: true,
    },
    userid: {
      type: String,
      index: true,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/\S+@\S+\.\S+/, "is invalid"],
    },
    // premium field to interact with Stripe
    premium: {
      type: String,
      required: true,
    },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  },
  { timestamps: true }
);

// if user is deleted, delete all reqs associated with user
userSchema.pre("remove", function (next) {
  this.model("FetchRequest").deleteMany({ user: this._id }, next);
});

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

const User = mongoose.model("User", UserSchema);
export default User;
