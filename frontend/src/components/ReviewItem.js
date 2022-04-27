import { Rating, Typography } from "@mui/material";

function ReviewItem({ review }) {
  return (
    <div className="card review-card" review-card-heading>
      <div className="review-card-heading">
        By <span>{review.author.name}</span>
      </div>
      <div className="review-card-body">
        <div className="review-card-rating">
          <Rating
            name="review-card-rating"
            className="review-card-rating-stars"
            value={review.rating}
            size="small"
            readOnly
          />
          <Typography component="legend">Rating: {review.rating}</Typography>
        </div>
        <div className="review-card-time">
          {new Date(review.createdAt).toLocaleString("en-US")}
        </div>
        <div className="review-card-text">{review.text}</div>
      </div>
    </div>
  );
}

export default ReviewItem;
