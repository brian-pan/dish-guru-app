const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = Schema({
  rating: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
