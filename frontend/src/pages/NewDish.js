import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { createDish, reset } from "../features/dishes/dishSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import {
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
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

function NewDish() {
  //global state
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.dishes
  );
  //local state
  const [username] = useState(user.name);
  const [formData, setFormData] = useState({
    name: "",
    diet: "Normal",
    description: "",
    stepOne: "",
    stepTwo: "",
    stepThree: "",
    stepFour: "",
    isPublic: false,
  });
  const {
    name,
    diet,
    description,
    stepOne,
    stepTwo,
    stepThree,
    stepFour,
    isPublic,
  } = formData;

  //initialize
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //reset state
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
      navigate("/my-dishes");
      toast.success("Dish Created!", {
        autoClose: 1000,
      });
    }
    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createDish(formData)); // axios post
  };

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
      </div>
      <section className="page-heading">
        <h1>Add new dish</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className="form">
        <div className="form-group">
          <TextField
            label="Username"
            variant="outlined"
            id="username"
            className="form-control"
            placeholder="Enter username"
            type="text"
            name="username"
            value={username}
            onChange={onChange}
            size="small"
            fullWidth
            disabled
          />
        </div>
        <form onSubmit={onSubmit}>
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
              label="Cooking Instruction - Step 1"
              variant="outlined"
              name="stepOne"
              id="stepOne"
              placeholder="Step 1..."
              type="text"
              value={stepOne}
              onChange={onChange}
              size="small"
              fullWidth
              required
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
              size="small"
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
              size="small"
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
              size="small"
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
              size="small"
              fullWidth
            />
          </div>

          <div className="form-group-checkbox">
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
          <div className="form-group page-addButton">
            <Button type="submit" variant="contained" color="success" fullWidth>
              Add Dish
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default NewDish;
