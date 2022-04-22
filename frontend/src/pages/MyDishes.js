import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyDishes, reset } from "../features/dishes/dishSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import MyDishItem from "../components/MyDishItem";
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
    <div className="dish-page">
      <div className="dish-buttons">
        <BackButton url="/" />
        {/* <AddButton url="/new-dish" /> */}
      </div>
      <h1 className="page-title">My Dishes</h1>
      <div className="dish-cards">
        {dishes.length ? null : <h3> You don't have any recipe yet...</h3>}
        <div className="dish-body">
          {dishes.map((dish) => (
            <MyDishItem key={dish._id} dish={dish} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyDishes;
