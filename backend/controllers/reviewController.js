const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Dish = require("../models/dishModel");
const Review = require("../models/reviewModel");

// @desc    create a review for a dish
// @route   POST /api/dishes||my-dishes/:dishId/reviews
// @access  Private
const createReview = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //check if user's only review for this dish
  const dish = await Dish.findById(req.params.dishId).populate("reviews");
  const filterResult = dish.reviews.filter(
    (review) => review.author === req.user.id
  );
  if (filterResult.length) {
    res.status(400);
    throw new Error("User cannot add multiple reviews");
  }

  const review = await Review.create({
    dish: req.params.dishId,
    author: req.user.id,
    rating: req.body.rating,
    text: req.body.text,
  });

  res.status(200).json(review);
});

// @desc    Get all reviews for a public dish
// @route   GET /api/dishes||my-dishes/:dishId/reviews
// @access  Public
const getReviews = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const reviews = await Review.find({ dish: req.params.dishId }).populate(
    "author"
  );

  res.status(200).json(reviews);
});

// @desc    Update a single review
// @route   PUT /api/dishes/:dishId/reviews/:reviewId
// @access  Private
const updateReview = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //Get dish
  const dish = await Dish.findById(req.params.dishId).populate("reviews");
  if (!dish) {
    res.status(404);
    throw new Error("Dish Page Not Found");
  }
  //Get review being updated
  const review = await Review.findById(req.params.reviewId).populate("author");
  //Check if user is the review author
  if (review.author._id.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized to update");
  }

  const updatedReview = await Dish.findByIdAndUpdate(
    req.params.reviewId,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedReview);
});

// @desc    delete a single review
// @route   DELETE /api/dishes/:dishId/reviews/:reviewId
// @access  Private
const deleteReview = asyncHandler(async (req, res) => {
  const { dishId, reviewId } = req.params;
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //Get dish using url params
  const dish = await Dish.findById(dishId).populate("reviews");
  if (!dish) {
    res.status(404);
    throw new Error("Dish Page Not Found");
  }
  //Get review using url params
  const review = await Review.findById(reviewId).populate("author");
  //Check if user is the review author
  if (review.author._id.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized to delete");
  }
  //remove reviewId from dish.reviews array
  await Dish.findByIdAndUpdate(dishId, {
    $pull: { reviews: reviewId },
  });
  //remove the review
  await Review.findByIdAndDelete(reviewId);

  res.status(200).json({ success: true });
});

module.exports = {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
};
