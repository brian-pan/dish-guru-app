import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPublicDishes, reset } from "../features/dishes/dishSlice";
import Spinner from "../components/Spinner";
import PublicDishItem from "../components/PublicDishItem";
import { Button, Chip } from "@mui/material";
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

function PublicDishes({ average }) {
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
        <Button
          component={Link}
          to="/"
          className="backButton"
          theme={themeBlack}
          size="large"
        >
          <ArrowCircleLeftOutlinedIcon />
          Back
        </Button>
      </div>
      <div className="page-heading">
        <h1>Explore Dishes</h1>
      </div>
      <div className="page-main">
        <div className="dish-cards">
          {dishes.map((dish) => (
            <PublicDishItem key={dish._id} dish={dish} average={average} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PublicDishes;
