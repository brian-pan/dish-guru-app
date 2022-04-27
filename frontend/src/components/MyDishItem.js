import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";
// import { BsEggFried } from "react-icons/bs";
// import { GiMeat } from "react-icons/gi";
import { Chip, Button } from "@mui/material";

function MyDishItem({ dish }) {
  return (
    <div className="card">
      <div className="dish-card-title">
        <h4>{dish.name}</h4>
      </div>
      <div className="dish-card-status">
        <div>
          {dish.diet !== "Normal" && (
            <Chip label={<FaLeaf />} variant="contained" color="success" />
          )}
        </div>
        <div>
          {dish.isPublic ? (
            <Chip label="PUBLIC" variant="contained" color="secondary" />
          ) : (
            <Chip label="PRIVATE" variant="contained" color="info" />
          )}
        </div>
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
        to={`/my-dishes/${dish._id}`}
        variant="contained"
        size="medium"
        fullWidth
      >
        View Details
      </Button>

      {/* <Chip variant="outlined" color="success" size="small" icon={<FaLeaf />} /> */}
    </div>
  );
}
export default MyDishItem;
