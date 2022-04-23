import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";

function PublicDishItem({ dish }) {
  return (
    <div className="dish-card">
      <div className="dish-card-title">
        <h4>{dish.name}</h4>
        <div>
          {dish.diet !== "Normal" && <FaLeaf />}
          {dish.diet}
        </div>
      </div>
      <div className="dish-card-author">
        By <span>{dish.author.name}</span>
      </div>
      <div className="dish-card-description">
        <p>{dish.description}</p>
      </div>
      <Link to={`/dishes/${dish._id}`} className="btn  btn-sm">
        View
      </Link>
    </div>
  );
}
export default PublicDishItem;
