const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

// @desc    Register a user
// @route   /api/users
// @access  public
registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  //find if user already exist
  const isUserExisted = await User.findOne({ email: email });
  if (isUserExisted) {
    res.status(400);
    throw new Error("User already exists");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      //send back to console:
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Login a user
// @route   /api/users/login
// @access  public
loginUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  //find the user and check if password match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      //send back to console:
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Incorrect email or password");
  }
});

//generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// // @desc    Get current user
// // @route   /api/users/me
// // @access  Private
// const getMe = asyncHandler(async (req, res) => {
//   const user = {
//     id: req.user._id,
//     email: req.user.email,
//     name: req.user.name,
//   };
//   res.status(200).json(user);
// });

module.exports = {
  registerUser,
  loginUser,
};
