import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPublicDish } from "../features/dishes/dishSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function PublicDish() {
  const { dish, isSuccess, isLoading, isError, message } = useSelector(
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

    dispatch(getPublicDish(dishId));
  }, [dispatch, message, dishId]);

  if (isLoading) {
    return <Spinner />;
  }

  console.log(dish);
  return (
    <div className="dish-page">
      <header className="dish-header">
        <BackButton url="/dishes" />
        <h2>{dish.name}</h2>
        <div>
          <h3 className={`dish-diet dish-diet-${dish.diet}`}>{dish.diet}</h3>
        </div>
        {dish.author ? (
          <p>
            Author: <span>{dish.author.name}</span>
          </p>
        ) : null}
        <p>Created On: {new Date(dish.createdAt).toLocaleString("en-US")}</p>
      </header>
      <hr />
      <section className="dish-description">
        <p>{dish.description}</p>
      </section>
      <hr />
      <section className="dish-steps">
        <h3>Cooking Instructions</h3>
        <p>{dish.steps}</p>
      </section>
    </div>
  );
}

export default PublicDish;
