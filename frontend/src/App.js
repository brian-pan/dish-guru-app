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
import PublicDishes from "./pages/PublicDishes";
import PublicDish from "./pages/PublicDish";
import MyDishes from "./pages/MyDishes";
import MyDish from "./pages/MyDish";
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

            <Route path="/dishes" element={<PublicDishes />} />
            <Route path="/dishes/:dishId" element={<PublicDish />} />

            <Route path="/my-dishes" element={<PrivateRoute />}>
              <Route path="/my-dishes" element={<MyDishes />} />
            </Route>
            <Route path="/my-dishes/:dishId" element={<PrivateRoute />}>
              <Route path="/my-dishes/:dishId" element={<MyDish />} />
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
