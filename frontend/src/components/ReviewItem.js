function ReviewItem({ review }) {
  return (
    <div className="review-card">
      <div className="review-card-header review-card-username">
        By <span>{review.author.name}</span>
      </div>
      <div className="review-card-body">
        <div className="review-card-rating">Rating: {review.rating}</div>
        <div className="review-card-time">
          {new Date(review.createdAt).toLocaleString("en-US")}
        </div>
        <div className="review-card-text">{review.text}</div>
      </div>
    </div>
  );
}

export default ReviewItem;
