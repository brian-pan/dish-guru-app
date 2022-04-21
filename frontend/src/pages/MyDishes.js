import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyDishes, reset } from "../features/dishes/dishSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import DishItem from "../components/DishItem";
// import AddButton from "../components/AddButton";

function MyDishes() {
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
    dispatch(getMyDishes());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="dish-buttons">
        <BackButton url="/" />
        {/* <AddButton url="/new-dish" /> */}
      </div>
      <h1 className="page-title">My Dishes</h1>
      <div className="dish-cards">
        <div className="dish-heading"></div>
        <div className="dish-body">
          {dishes.map((dish) => (
            <DishItem key={dish._id} dish={dish} />
          ))}
        </div>
      </div>
    </>
  );
}

export default MyDishes;
