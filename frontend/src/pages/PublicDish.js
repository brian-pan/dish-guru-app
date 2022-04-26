import { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { getPublicDish } from "../features/dishes/dishSlice";
import { createReview, getReviews } from "../features/reviews/reviewSlice";
import { FaPlus } from "react-icons/fa";
import ReviewItem from "../components/ReviewItem";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { Button, TextField, Typography, Rating } from "@mui/material";

const customStyles = {
  content: {
    width: "100%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");

function PublicDish() {
  //initialize
  const params = useParams();
  const { dishId } = params;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { dish, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.dishes
  );
  const {
    reviews,
    isSuccess: reviewIsSuccess,
    isLoading: reviewIsLoading,
    // isError: reviewIsError,
    // message: reviewMessage,
  } = useSelector((state) => state.reviews);

  const [isReviewShown, setIsReviewShown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({
    text: "",
    rating: 1,
    // author: user._id,
    author: user ? user._id : "",
    dish: dishId,
  });

  console.log("user", user);
  console.log("dish:", dish);
  const { text, rating } = reviewFormData;

  // let average = Math.round(
  //   reviews.reduce((acc, { rating }) => acc + rating, 0) / reviews.length
  // );

  const onChange = (e) => {
    setReviewFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      // text: e.target.value,
      // rating: parseInt(e.target.value),
    }));
  };

  console.log("reviewFormData:", reviewFormData);

  const onReviewSubmit = (e) => {
    e.preventDefault();
    dispatch(createReview({ dishId, reviewFormData }));
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getPublicDish(dishId));
    dispatch(getReviews(dishId));
  }, [dispatch, message, dishId]);

  if (isLoading || reviewIsLoading) {
    return <Spinner />;
  }

  console.log("Reviews:", reviews);

  return (
    <div className="dish-page">
      <header className="dish-header">
        <BackButton url="/dishes" />
        <h2>{dish.name}</h2>
        <div>
          <h3 className={`dish-diet dish-diet-${dish.diet}`}>{dish.diet}</h3>
        </div>
        <div className="dish-ratings">
          {/* avg review rating and total numbers */}
          {/* {reviews.length !== 0 && (
            <div className="dish-ratings-rating">
              {isNaN(average) ? 0 : average}/5 Stars
            </div>
          )} */}
          <div className="dish-ratings-number">{reviews.length} Reviews</div>
        </div>
        {dish.author ? (
          <p>
            Author: <span>{dish.author.name}</span>
          </p>
        ) : null}
        <p>Created On: {new Date(dish.createdAt).toLocaleString("en-US")}</p>
      </header>
      <hr />
      <section className="dish-description">
        <p>{dish.description}</p>
      </section>
      <hr />
      <section className="dish-steps">
        <h3>Cooking Instructions</h3>
        <p>{dish.steps}</p>
      </section>
      <hr />
      <section className="dish-reviews">
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          style={customStyles}
          contentLabel="Add Review"
        >
          <div className="header">
            <h2>Add Review</h2>
            <button className="btn-close" onClick={() => setIsModalOpen(false)}>
              X
            </button>
          </div>
          <form onSubmit={onReviewSubmit} className="form">
            <div className="form-group form-rating">
              <Typography component="legend">
                <h4>How would you rate the dish?</h4>
              </Typography>
              <Rating
                name="rating"
                value={parseInt(rating)}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <TextField
                name="text"
                label="Review"
                id="text"
                className="form-control"
                placeholder="Review"
                value={text}
                onChange={onChange}
                fullWidth
              ></TextField>
            </div>
            <div className="form-group">
              <Button type="submit" variant="outlined" fullWidth>
                <span>Add</span>
              </Button>
            </div>
          </form>
        </Modal>

        <div className="reviews-header">
          <div>
            {user ? (
              <Button color="success" onClick={() => setIsModalOpen(true)}>
                <FaPlus />
                Add a review
              </Button>
            ) : (
              <Button
                fullWidth
                onClick={() => {
                  navigate("/login");
                }}
              >
                <FaPlus />
                Login to add a review
              </Button>
            )}
          </div>
          <div>
            <h4 onClick={() => setIsReviewShown(!isReviewShown)}>
              {isReviewShown ? "Hide" : "View"} all reviews
            </h4>
          </div>
        </div>

        {isReviewShown ? (
          <div className="dish-reviews-cards">
            {reviews.map((review) => (
              <ReviewItem
                key={review._id}
                review={review}
                // username={user.name}
              />
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default PublicDish;
