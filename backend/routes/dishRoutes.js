const express = require("express");
const router = express.Router();
const {
  getMyDishes,
  getPublicDishes,
  getMyDish,
  getPublicDish,
  createDish,
  updateDish,
  deleteDish,
} = require("../controllers/dishController.js");

const { protect } = require("../middleware/authMiddleware");

router.route("/my-dishes/").get(protect, getMyDishes).post(protect, createDish);

router
  .route("/my-dishes/:dishId")
  .get(protect, getMyDish)
  .put(protect, updateDish)
  .delete(protect, deleteDish);

router.route("/dishes/").get(getPublicDishes);

router.route("/dishes/:dishId/").get(getPublicDish);

module.exports = router;
