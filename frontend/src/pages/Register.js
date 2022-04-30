import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { Button, TextField } from "@mui/material";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  //redux - dispatch any fn we have
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    //redirect when logged in
    if (isSuccess || user) {
      navigate("/");
      toast.success(`Welcome to DishGuru, ${user.name}!`, {
        autoClose: 1500,
      });
    }

    dispatch(reset);
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    //check password and confirm password match
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="page">
      <section className="page-heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <TextField
              label="Name"
              variant="outlined"
              id="name"
              className="form-control"
              placeholder="Enter name"
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              size="small"
              fullWidth
              required
            />
          </div>
          <div className="form-group">
            <TextField
              label="Email"
              variant="outlined"
              id="email"
              className="form-control"
              placeholder="Enter email"
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              size="small"
              fullWidth
              required
            />
          </div>
          <div className="form-group">
            <TextField
              id="password"
              className="form-control"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              label="Password"
              variant="outlined"
              fullWidth
              size="small"
              placeholder="Enter password"
              required
            />
          </div>
          <div className="form-group">
            <TextField
              id="password2"
              className="form-control"
              type="password"
              name="password2"
              value={password2}
              onChange={onChange}
              label="Confirm Password"
              variant="outlined"
              fullWidth
              size="small"
              placeholder="Confirm password"
              required
            />
          </div>
          <div className="form-group">
            <Button variant="contained" type="submit" color="success" fullWidth>
              Register
            </Button>
          </div>
          <div className="form-group registerToLoginLink">
            <Link to="/login" id="registerToLoginLink">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Register;
