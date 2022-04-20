const mongoose = require("mongoose");

const dishSchema = mongoose.Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
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
