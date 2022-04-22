import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMyDishes, reset } from "../features/dishes/dishSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function RandomDish() {
  const { dishes, isLoading, isSuccess, isError } = useSelector(
    (state) => state.dishes
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const randomNum = Math.floor(Math.random() * dishes.length);
  console.log(Math.random() * dishes.length);
  console.log(randomNum);

  const onClick = () => {
    const dish = dishes[randomNum];
    navigate(`/my-dishes/${dish._id}`);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="heading">
      <BackButton url="/" />
      <h1>Random Dish</h1>
      <button className="btn btn-block" onClick={onClick}>
        Get Dish
      </button>
    </div>
  );
}

export default RandomDish;
