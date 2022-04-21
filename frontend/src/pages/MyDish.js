import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMyDish, reset } from "../features/dishes/dishSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function MyDish() {
  const { dish, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.dishes
  );

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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="dish-page">
      <header className="dish-header">
        <BackButton url="/my-dishes" />

        <h2>{dish.name}</h2>
        <div>
          <h3 className={`dish-diet dish-diet-${dish.diet}`}>{dish.diet}</h3>
          <h3 className={`dish-isPublic-${dish.isPublic}`}>
            {dish.isPublic ? "Public" : "Private"}
          </h3>
        </div>
        <p>Created At: {new Date(dish.createdAt).toLocaleString("en-US")}</p>
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
    </div>
  );
}

export default MyDish;
