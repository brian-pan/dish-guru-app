import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "../components/Spinner";

const PrivateRoute = () => {
  const { isLoggedIn, isCheckingStatus } = useAuthStatus();

  if (isCheckingStatus) {
    return <Spinner />;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
