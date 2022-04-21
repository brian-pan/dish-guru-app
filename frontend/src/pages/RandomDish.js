import { useSelector } from "react-redux";
import { getMyDishes } from "../features/dishes/dishSlice";

function RandomDish() {
  const { dishes } = useSelector((state) => state.dishes);

  return <div>{dishes.length}</div>;
}
export default RandomDish;
