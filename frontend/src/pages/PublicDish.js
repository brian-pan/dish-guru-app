import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { getPublicDish } from "../features/dishes/dishSlice";
import { getReviews } from "../features/reviews/reviewSlice";
import { FaPlus } from "react-icons/fa";
import ReviewItem from "../components/ReviewItem";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function PublicDish() {
  const { dish, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.dishes
  );
  const {
    reviews,
    isSuccess: reviewIsSuccess,
    isLoading: reviewIsLoading,
    isError: reviewIsError,
    message: reviewMessage,
  } = useSelector((state) => state.reviews);

  const [isReviewShown, setIsReviewShown] = useState(false);

  //initialize
  const params = useParams();
  const { dishId } = params;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onAddReview = () => {
    console.log("add review");
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

  console.log(reviews);
  return (
    <div className="dish-page">
      <header className="dish-header">
        <BackButton url="/dishes" />
        <h2>{dish.name}</h2>
        <div>
          <h3 className={`dish-diet dish-diet-${dish.diet}`}>{dish.diet}</h3>
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
        <button className="btn btn-block" onClick={onAddReview}>
          <FaPlus />
          Add a review
        </button>
        <h4 onClick={() => setIsReviewShown(!isReviewShown)}>
          {isReviewShown ? "Hide" : "View"} all reviews
        </h4>
        {isReviewShown ? (
          <div className="dish-reviews-cards">
            {reviews.map((review) => (
              <ReviewItem key={review._id} review={review} />
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default PublicDish;
