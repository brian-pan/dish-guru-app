const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    name: {
      type: String,
      // required: true
      required: [true, "Please add a name"],
      unique: true,
    },
    email: {
      type: String,
      // required: true
      required: [true, "Please add a email"],
      unique: true,
    },
    password: {
      type: String,
      // required: true
      required: [true, "Please add a password"],
    },
    isAdmin: {
      type: Boolean,
      // required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
