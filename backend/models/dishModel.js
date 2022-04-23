const mongoose = require("mongoose");
const Review = require("./reviewModel");
const Schema = mongoose.Schema;

const dishSchema = Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    name: {
      type: String,
      required: [true, "Please specify the dish name"],
    },
    diet: {
      type: String,
      required: [true, "Please select a diet type"],
      enum: ["Normal", "Vegetarian", "Vegan"],
      default: "Normal",
    },
    description: {
      type: String,
    },
    steps: {
      type: String,
      required: [true, "Please add some cooking instructions"],
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Dish", dishSchema);
