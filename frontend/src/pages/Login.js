import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { Button, TextField } from "@mui/material";

function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  //when we submit the form, trigger:
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    //redirect when logged in
    if (isSuccess || user) {
      navigate("/");
      toast.success(`Welcome back, ${user.name}!`, {
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

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="page">
      <section className="page-heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please login to view</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
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
            {/* <button className="btn btn-block">Login</button> */}
            <Button variant="contained" type="submit" fullWidth>
              Login
            </Button>
          </div>
          <div className="form-group loginToRegisterLink">
            <Link to="/register" id="loginToRegisterLink">
              Don't have an account? Register
            </Link>
          </div>
        </form>
      </section>

      <footer className="copyright">&copy; Zifan Pan 2022</footer>
    </div>
  );
}

export default Login;
