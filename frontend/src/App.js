//import packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import components
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
//import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dishes from "./pages/Dishes";
import MyDishes from "./pages/MyDishes";
import NewDish from "./pages/NewDish";
import RandomDish from "./pages/RandomDish";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dishes" element={<Dishes />} />
            <Route path="/my-dishes" element={<PrivateRoute />}>
              <Route path="/my-dishes" element={<MyDishes />} />
            </Route>
            <Route path="/new-dish" element={<PrivateRoute />}>
              <Route path="/new-dish" element={<NewDish />} />
            </Route>
            <Route path="/random" element={<PrivateRoute />}>
              <Route path="/random" element={<RandomDish />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
