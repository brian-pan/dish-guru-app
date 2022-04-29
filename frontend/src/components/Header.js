import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { reset as dishReset } from "../features/dishes/dishSlice";
import { Button, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onClick = () => {
    dispatch(dishReset());
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" onClick={onClick}>
          <span id="logo-spices">Dish</span>
          <span id="logo-guru">Guru</span>
        </Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <Button
                onClick={onLogout}
                variant="outlined"
                color="error"
                size="small"
              >
                <FaSignOutAlt /> Logout
              </Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}
export default Header;
