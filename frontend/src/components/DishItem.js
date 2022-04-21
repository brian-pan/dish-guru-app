import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";
// import { BsEggFried } from "react-icons/bs";
// import { GiMeat } from "react-icons/gi";
// import { Chip } from "@mui/material";

function DishItem({ dish }) {
  return (
    <div className="dish-card">
      <div className="dish-card-title">
        <div>{dish.name}</div>
        <div>
          {dish.diet !== "Normal" && <FaLeaf />}
          {dish.diet}
        </div>
      </div>
      {dish.isPublic && (
        <div className="dish-card-isPublic">
          <p>Public</p>
        </div>
      )}
      <div className="dish-card-description">
        <p>{dish.description}</p>
      </div>
      <Link to={`/my-dishes/${dish._id}`} className="btn  btn-sm">
        View
      </Link>

      {/* <Chip variant="outlined" color="success" size="small" icon={<FaLeaf />} /> */}
    </div>
  );
}
export default DishItem;
