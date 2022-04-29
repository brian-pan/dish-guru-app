import { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { getPublicDish } from "../features/dishes/dishSlice";
import { createReview, getReviews } from "../features/reviews/reviewSlice";
import { FaPlus } from "react-icons/fa";
import ReviewItem from "../components/ReviewItem";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { FaLeaf } from "react-icons/fa";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { Button, TextField, Typography, Rating, Chip } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

const themePeanut = createTheme({
  palette: {
    primary: {
      main: "#a13800",
    },
    secondary: {
      main: "#ffc107",
    },
  },
});

const themeChili = createTheme({
  palette: {
    primary: {
      main: "#aa2e25",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

const themeBlack = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#000",
    },
  },
});

const customStyles = {
  content: {
    width: "80%",
    height: "50%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
    boxShadow: "0px 2.98256px 7.4564px rgba(0, 0, 0, 0.4)",
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

  const [isReviewShown, setIsReviewShown] = useState(true);
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

  let average = (
    reviews.reduce((acc, { rating }) => acc + rating, 0) / reviews.length
  ).toFixed(1);

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
    <div className="page">
      <div className="page-backButton">
        <Button
          component={Link}
          to="/dishes"
          variant="outlined"
          theme={themeBlack}
          size="small"
        >
          <ArrowCircleLeftOutlinedIcon />
          Back
        </Button>
      </div>
      <header className="page-heading">
        <h1>{dish.name}</h1>
        <div id="detailPageChip">
          {dish.diet === "Normal" ? (
            <Chip label="Regular Diet" variant="outlined" color="warning" />
          ) : (
            <Chip
              icon={<FaLeaf />}
              label={dish.diet}
              variant="outlined"
              color="success"
            />
          )}
        </div>
        <div className="page-heading-ratings">
          {reviews.length !== 0 && (
            <>
              <div className="page-heading-rating">
                <Rating
                  name="rating-display"
                  value={average}
                  precision={0.01}
                  size="small"
                  readOnly
                />
                <Typography component="legend">
                  {isNaN(average) ? 0 : average}/5
                </Typography>
              </div>
              <div className="page-ratings-number">
                {reviews.length} Reviews
              </div>
            </>
          )}
        </div>
        <div className="page-heading-author">
          {dish.author ? (
            <p>
              Author: <span>{dish.author.name}</span>
            </p>
          ) : null}
        </div>
        <div className="page-heading-date">
          <p>Created On: {new Date(dish.createdAt).toLocaleString("en-US")}</p>
        </div>
      </header>
      {/* <hr /> */}
      <main className="page-main">
        <section className="page-description">
          <p>
            <span>"</span>
            {dish.description}
            <span>"</span>
          </p>
        </section>
        {/* <hr /> */}
        <section className="page-steps">
          <h3>How to cook</h3>
          {dish.stepOne && (
            <>
              <h4>Step 1:</h4>
              <p>{dish.stepOne}</p>
            </>
          )}
          {dish.stepTwo && (
            <>
              <h4>Step 2:</h4>
              <p>{dish.stepTwo}</p>
            </>
          )}
          {dish.stepThree && (
            <>
              <h4>Step 3:</h4>
              <p>{dish.stepThree}</p>
            </>
          )}
          {dish.stepFour && (
            <>
              <h4>Step 4:</h4>
              <p>{dish.stepFour}</p>
            </>
          )}
        </section>
        {/* <hr /> */}
        <section className="page-reviews">
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            style={customStyles}
            contentLabel="Add Review"
          >
            <div className="modal-heading">
              <h2>Add Review</h2>
              <button
                className="btn-close"
                onClick={() => setIsModalOpen(false)}
              >
                <CloseIcon />
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
                  size="large"
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
                  multiline
                  rows={5}
                ></TextField>
              </div>
              <div className="form-group">
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  fullWidth
                >
                  <span>Add Review</span>
                </Button>
              </div>
            </form>
          </Modal>

          <div className="reviews-header">
            <div>
              <h3>Reviews ({reviews.length})</h3>
              {user ? (
                <Button
                  color="success"
                  variant="contained"
                  onClick={() => setIsModalOpen(true)}
                >
                  <FaPlus />
                  Add a review
                </Button>
              ) : (
                <Button
                  variant="contained"
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
      </main>
    </div>
  );
}

export default PublicDish;
