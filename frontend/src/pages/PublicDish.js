import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPublicDish } from "../features/dishes/dishSlice";

function PublicDish() {
  const { dish, isSuccess, isLoading, isError } = useSelector(
    (state) => state.dishes
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPublicDish());
    console.log(dish);
  }, [dispatch]);

  return <div></div>;
}

export default PublicDish;
