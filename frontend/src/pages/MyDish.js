import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getMyDish,
  getMyDishes,
  updateDish,
  deleteDish,
  reset,
} from "../features/dishes/dishSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function MyDish() {
  const { user } = useSelector((state) => state.auth);
  const { dish, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.dishes
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState({});

  const { name, diet, description, steps, isPublic } = editItem;

  //initialize
  const params = useParams();
  const { dishId } = params;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getMyDish(dishId));
  }, [dispatch, message, dishId]);

  //enter edit mode
  const onEdit = () => {
    if (!!dish) {
      setIsEditing(true);
      setEditItem(dish); //Need ...dish?
    }
  };

  //Realtime change state
  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditItem((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //submit updated form to backend
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDish(dishId, editItem));
    // {set back to initial state}
  };

  //delete dish page from backend and re-get rest pages
  const onDelete = () => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteDish(dishId));
      dispatch(getMyDishes());
      navigate("/my-dishes");
    }
    //can be improved
    //now: backend delete; frontend get all; front load again
    //ideal: change state - dishes array, find dish._id === response.data._id, remove, reload page
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {isEditing ? (
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Dish Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={name}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="diet">Diet Type</label>
              <select name="diet" id="diet" value={diet} onChange={onChange}>
                <option value="Normal">Normal</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="steps">Cooking Instruction Steps</label>
              <textarea
                name="steps"
                id="steps"
                className="form-control"
                placeholder="Steps 1, 2, 3..."
                value={steps}
                onChange={onChange}
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="description">
                Brief Description of dish (Optional)
              </label>
              <textarea
                name="description"
                id="description"
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={onChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="isPublic">Public?</label>
              <input
                type="checkbox"
                name="isPublic"
                id="isPublic"
                checked={isPublic}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-block">Add</button>
            </div>
          </form>
        </section>
      ) : (
        <div className="dish-page">
          <header className="dish-header">
            <div className="dish-buttons">
              <BackButton url="/my-dishes" />
              {dish.author === user._id ? (
                <button className="btn btn-back" onClick={onEdit}>
                  Edit
                </button>
              ) : null}
            </div>
            <h2>{dish.name}</h2>
            <div>
              <h3 className={`dish-diet dish-diet-${dish.diet}`}>
                {dish.diet}
              </h3>
              <h3 className={`dish-isPublic-${dish.isPublic}`}>
                {dish.isPublic ? "Public" : "Private"}
              </h3>
            </div>
            <p>
              Created At: {new Date(dish.createdAt).toLocaleString("en-US")}
            </p>
          </header>
          <hr />
          <section className="dish-body">
            <div className="dish-description">
              {dish.description && <h3>Description:</h3>}
              {dish.description}
            </div>
            {dish.description && <hr />}
            <div className="dish-steps">
              <h3>Cooking Instructions:</h3>
              {dish.steps}
            </div>
          </section>
          <section className="dish-delete">
            <button className="btn btn-block btn-danger" onClick={onDelete}>
              Delete
            </button>
          </section>
        </div>
      )}
    </>
  );
}

export default MyDish;
