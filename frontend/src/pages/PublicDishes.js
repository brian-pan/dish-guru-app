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
  }, [dispatch]);

  console.log(dishes);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="page">
      <div className="page-backButton">
        <BackButton url="/" />
      </div>
      <div className="page-heading">
        <h1>Explore Dishes</h1>
      </div>
      <div className="page-main">
        <div className="cards">
          {dishes.map((dish) => (
            <PublicDishItem key={dish._id} dish={dish} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PublicDishes;
