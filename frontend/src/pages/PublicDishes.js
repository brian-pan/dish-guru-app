import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPublicDishes, reset } from "../features/dishes/dishSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import PublicDishItem from "../components/PublicDishItem";

function PublicDishes() {
  const { dishes, isLoading, isSuccess } = useSelector((state) => state.dishes);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getPublicDishes());
    console.log(dishes);
  }, [dispatch]);

  console.log(dishes);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="dish-buttons">
        <BackButton url="/" />
      </div>
      <h1 className="page-title">Explore Dishes</h1>
      <div className="dish-cards">
        <div className="dish-body">
          {dishes.map((dish) => (
            <PublicDishItem key={dish._id} dish={dish} />
          ))}
        </div>
      </div>
    </>
  );
}

export default PublicDishes;
