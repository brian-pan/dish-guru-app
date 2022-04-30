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
    // navigate("/");
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
              <Link to="/" onClick={onLogout} className="navbar-link">
                <FaSignOutAlt /> Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="navbar-link">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="navbar-link">
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
