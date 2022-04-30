import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getMyDishes, reset } from "../features/dishes/dishSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import MyDishItem from "../components/MyDishItem";
import { Button } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";

const themeBlack = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#000",
    },
  },
});

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
    <div className="page">
      <div className="page-backButton">
        <Button
          component={Link}
          to="/"
          variant="outlined"
          theme={themeBlack}
          size="large"
        >
          <ArrowCircleLeftOutlinedIcon />
          Back
        </Button>
        {/* <AddButton url="/new-dish" /> */}
      </div>
      <main className="page-main">
        <div className="page-heading">
          <h1>My Dishes</h1>
        </div>
        {dishes.length ? null : <h3> You don't have any recipe yet...</h3>}
        <div className="dish-cards">
          {dishes.map((dish) => (
            <MyDishItem key={dish._id} dish={dish} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default MyDishes;
