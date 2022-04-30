import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getMyDish,
  getMyDishes,
  updateDish,
  deleteDish,
  reset,
  resetLoadingState,
} from "../features/dishes/dishSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { FaLeaf } from "react-icons/fa";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import {
  Button,
  TextField,
  Typography,
  Rating,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";

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

function MyDish() {
  const { user } = useSelector((state) => state.auth);
  const { dish, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.dishes
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState({});

  const {
    name,
    diet,
    description,
    stepOne,
    stepTwo,
    stepThree,
    stepFour,
    isPublic,
  } = editItem;

  //initialize
  const params = useParams();
  const { dishId } = params;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(isSuccess);
    if (isError) {
      toast.error(message);
    }

    dispatch(getMyDish(dishId));
    // dispatch(resetLoadingState());
    // console.log("getMyDish", isSuccess);
  }, [dispatch, message, dishId]);

  //enter edit mode
  const onEdit = () => {
    console.log("onEdit", isSuccess);
    if (!!dish) {
      setIsEditing(true);
      setEditItem(dish); //Need ...dish?
    }
  };

  //Realtime change state
  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditItem((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  // console.log(editItem);

  //submit updated form to backend
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("before", isSuccess);
    dispatch(updateDish({ dishId, editItem }));
    dispatch(resetLoadingState());
    console.log(isSuccess);
    // set back to initial state

    setIsEditing(false);
    setEditItem({});
  };

  //delete dish page from backend and re-get rest pages
  const onDelete = () => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteDish(dishId));
      dispatch(getMyDishes());
      navigate("/my-dishes");
    }
    //can be improved
    //now: backend delete; frontend get all; front load again
    //ideal: change state - dishes array, find dish._id === response.data._id, remove, reload page
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="page">
      {isEditing ? (
        <section className="form">
          <div className="page-heading">
            <h1>Editing Dish</h1>
          </div>
          <form onSubmit={onSubmit}>
            {/* back button */}
            <div className="form-group">
              <TextField
                label="Dish Name"
                variant="outlined"
                id="name"
                className="form-control"
                placeholder="Dish Name"
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                size="small"
                fullWidth
              />
            </div>

            <div className="form-group">
              <FormControl fullWidth>
                <InputLabel id="diet">Diet Type</InputLabel>
                <Select
                  labelId="diet"
                  id="diet"
                  value={diet}
                  label="Diet Type"
                  onChange={onChange}
                  name="diet"
                >
                  <MenuItem value="Normal">Regular</MenuItem>
                  <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                  <MenuItem value="Vegan">Vegan</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="form-group">
              <TextField
                className="form-control"
                label="Cooking Instruction - step 1"
                variant="outlined"
                name="stepOne"
                id="stepOne"
                placeholder="Step 1..."
                type="text"
                value={stepOne}
                onChange={onChange}
                size="large"
                fullWidth
              />
            </div>

            <div className="form-group">
              <TextField
                className="form-control"
                label="Step 2 (optional)"
                variant="outlined"
                name="stepTwo"
                id="stepTwo"
                placeholder="Step 2..."
                type="text"
                value={stepTwo}
                onChange={onChange}
                size="large"
                fullWidth
              />
            </div>
            <div className="form-group">
              <TextField
                className="form-control"
                label="Step 3 (optional)"
                variant="outlined"
                name="stepThree"
                id="stepThree"
                placeholder="Step 3..."
                type="text"
                value={stepThree}
                onChange={onChange}
                size="large"
                fullWidth
              />
            </div>
            <div className="form-group">
              <TextField
                className="form-control"
                label="Step 4 (optional)"
                variant="outlined"
                name="stepFour"
                id="stepFour"
                placeholder="Step 4..."
                type="text"
                value={stepFour}
                onChange={onChange}
                size="large"
                fullWidth
              />
            </div>

            <div className="form-group">
              <TextField
                className="form-control"
                label="Description"
                variant="outlined"
                name="description"
                id="description"
                placeholder="Brief description of dish (optional)"
                type="text"
                value={description}
                onChange={onChange}
                size="large"
                fullWidth
              />
            </div>
            <div className="form-group form-group-checkbox">
              <FormGroup>
                <FormControlLabel
                  labelPlacement="start"
                  label="Show dish publicly?"
                  control={
                    <Checkbox
                      name="isPublic"
                      id="isPublic"
                      checked={isPublic}
                      onChange={onChange}
                      color="success"
                    />
                  }
                />
              </FormGroup>
            </div>
            <div className="form-group">
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
              >
                Update Dish
              </Button>
            </div>
          </form>
        </section>
      ) : (
        <div className="layout">
          <header>
            <div className="page-buttons">
              <div className="page-backButton">
                <Button
                  className="backButton"
                  component={Link}
                  to="/my-dishes"
                  theme={themeBlack}
                  size="large"
                >
                  <ArrowCircleLeftOutlinedIcon />
                  Back
                </Button>
              </div>
              <div className="page-editButton">
                <Button onClick={onEdit} variant="contained" color="success">
                  Edit Dish
                </Button>
              </div>
            </div>
            <div className="page-heading">
              <h1>{dish.name}</h1>

              <div id="privatePageChips">
                <div>
                  {dish.isPublic ? (
                    <Chip
                      label="PUBLIC"
                      variant="contained"
                      color="secondary"
                    />
                  ) : (
                    <Chip label="PRIVATE" variant="contained" color="info" />
                  )}
                </div>
                <div>
                  {dish.diet === "Normal" ? (
                    <Chip
                      label="Regular Diet"
                      variant="outlined"
                      theme={themeBlack}
                      color="primary"
                    />
                  ) : (
                    <Chip
                      icon={<FaLeaf />}
                      label={dish.diet}
                      variant="outlined"
                      color="success"
                    />
                  )}
                </div>
              </div>
              <div className="page-heading-date">
                <p>
                  Created On: {new Date(dish.createdAt).toLocaleString("en-US")}
                </p>
              </div>
            </div>
          </header>
          <section className="page-main">
            <div className="page-description">
              <span>"</span>
              {dish.description}
              <span>"</span>
            </div>
            <div className="page-steps">
              <h3>Cooking Instructions</h3>
              <h4>Step 1:</h4>
              <p>{dish.stepOne}</p>
              {dish.stepTwo && <h4>Step 2:</h4>}
              <p>{dish.stepTwo}</p>
              {dish.stepThree && <h4>Step 3:</h4>}
              <p>{dish.stepThree}</p>
              {dish.stepFour && <h4>Step 4:</h4>}
              <p>{dish.stepFour}</p>
            </div>
          </section>
          <section className="page-deleteButton">
            <Button
              onClick={onDelete}
              color="error"
              variant="contained"
              fullWidth
            >
              Delete Dish
            </Button>
          </section>
        </div>
      )}
    </div>
  );
}

export default MyDish;
