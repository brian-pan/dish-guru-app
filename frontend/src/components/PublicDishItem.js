import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";
import { Button, Chip, Typography, Rating } from "@mui/material";

function PublicDishItem({ dish, average }) {
  return (
    <div className="card">
      <div>
        <div className="dish-card-title">
          <h4>{dish.name}</h4>
          <div>
            {dish.diet !== "Normal" && (
              <Chip label={<FaLeaf />} variant="contained" color="success" />
            )}
          </div>
        </div>

        <div className="dish-card-author">
          <p>By </p>
          <span>{dish.author.name}</span>
        </div>
      </div>
      {/* <div className="dish-card-rating">
        <Rating
          name="rating-display"
          value={average}
          precision={0.1}
          size="small"
          readOnly
        />
        <Typography component="legend">{dish.rating}/5</Typography>
      </div> */}

      <div className="dish-card-description">
        <p>
          <span>"</span>
          {dish.description}
          <span>"</span>
        </p>
      </div>
      <Button
        component={Link}
        to={`/dishes/${dish._id}`}
        variant="contained"
        size="medium"
        fullWidth
      >
        View Details
      </Button>
    </div>
  );
}
export default PublicDishItem;
