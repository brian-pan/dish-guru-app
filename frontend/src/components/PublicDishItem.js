import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";

function PublicDishItem({ dish }) {
  return (
    <div className="dish-card">
      <div className="dish-card-title">
        <div>{dish.name}</div>
        <div>
          {dish.isPublic && (
            <div className="dish-card-isPublic">
              <p>Public</p>
            </div>
          )}
        </div>
      </div>
      {dish.diet !== "Normal" && <FaLeaf />}
      {dish.diet}
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
