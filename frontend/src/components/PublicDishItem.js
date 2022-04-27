import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";
import { Button, Chip } from "@mui/material";

function PublicDishItem({ dish }) {
  return (
    <div className="card">
      <div className="dish-card-title">
        <h4>{dish.name}</h4>
        <div>
          {dish.diet !== "Normal" && (
            <Chip label={<FaLeaf />} variant="contained" color="success" />
          )}
        </div>
      </div>
      <div className="dish-card-author">
        By <span>{dish.author.name}</span>
      </div>
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
