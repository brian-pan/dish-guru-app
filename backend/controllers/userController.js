const asyncHandler = require("express-async-handler");

// @desc    Register a user
// @route   /api/users
// @access  public
registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  res.send("Register user");
});

// @desc    Login a user
// @route   /api/users/login
// @access  public
loginUser = asyncHandler(async (req, res) => {
  res.send("Login Route");
});

module.exports = {
  registerUser,
  loginUser,
};
