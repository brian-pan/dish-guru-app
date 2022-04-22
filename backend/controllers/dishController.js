const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Dish = require("../models/dishModel");

// @desc    Get user dishes
// @route   GET /api/my-dishes
// @access  Private
const getMyDishes = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const dishes = await Dish.find({ author: req.user.id });

  res.status(200).json(dishes);
});

// @desc    Get all public dishes
// @route   GET /api/dishes/
// @access  Public
const getPublicDishes = asyncHandler(async (req, res) => {
  //find all dishes that is public
  const dishes = await Dish.find({ isPublic: true });

  res.status(200).json(dishes);
});

// @desc    Get single dish (show single dish detail)
// @route   GET /api/my-dishes/:dishId
// @access  Private
const getMyDish = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const dish = await Dish.findById(req.params.dishId);
  if (!dish) {
    res.status(404);
    throw new Error("Dish Page Not Found");
  }

  //check if authorized
  if (dish.author.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized to view");
  }

  res.status(200).json(dish);
});

// @desc    Get single dish (show single dish detail)
// @route   GET /api/dishes/:dishId
// @access  Public
const getPublicDish = asyncHandler(async (req, res) => {
  const dish = await Dish.findById(req.params.dishId);
  if (!dish) {
    res.status(404);
    throw new Error("Dish Page Not Found");
  }
  //check if dish is private
  if ((dish.isPublic = false)) {
    res.status(401);
    throw new Error("Private Page, Not Authorized");
  }

  res.status(200).json(dish);
});

// @desc    create new dish
// @route   POST /api/my-dishes
// @access  Private
const createDish = asyncHandler(async (req, res) => {
  const { name, steps, description, diet, isPublic } = req.body;
  if (!name || !steps) {
    res.status(400);
    throw new Error("Please add name and steps");
  }

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const dish = await Dish.create({
    name,
    steps,
    description,
    diet,
    isPublic,
    author: req.user.id,
  });

  res.status(201).json(dish);
});

// @desc    Update ticket
// @route   PUT /api/my-dishes/:dishId
// @access  Private
const updateDish = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const dish = await Dish.findById(req.params.dishId);
  if (!dish) {
    res.status(404);
    throw new Error("Dish Page Not Found");
  }

  //only owner can view its own dish
  if (dish.author.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized to update ticket");
  }

  const updatedDish = await Dish.findByIdAndUpdate(
    req.params.dishId,
    req.body,
    {
      new: true,
    }
  );

  //return
  res.status(200).json(updatedDish);
});

// @desc    Delete dish
// @route   DELETE /api/my-dishes/:dishId
// @access  Private
const deleteDish = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const dish = await Dish.findById(req.params.dishId);
  if (!dish) {
    res.status(404);
    throw new Error("Dish not found");
  }

  //only owner can view its own dish
  if (dish.author.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized to delete");
  }

  await dish.remove();

  res.status(200).json({ success: true });
});

module.exports = {
  getMyDishes,
  getPublicDishes,
  getMyDish,
  getPublicDish,
  createDish,
  updateDish,
  deleteDish,
};
