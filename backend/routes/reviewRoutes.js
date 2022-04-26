const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getReviews).post(protect, createReview);

router
  .route("/:reviewId")
  .put(protect, updateReview)
  .delete(protect, deleteReview);

module.exports = router;
