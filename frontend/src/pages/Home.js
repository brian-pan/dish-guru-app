import { Link } from "react-router-dom";
import { FaQuestionCircle, FaGlobe, FaCarrot, FaList } from "react-icons/fa";
import { useSelector } from "react-redux";

function Home() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="page">
      <section className="page-heading">
        <h1>Welcome {user ? "back, " + user.name : " to DishGuru"}</h1>
      </section>

      <div className="page-home-cards">
        <Link to="/dishes" className="card page-home-card">
          <FaGlobe />
          <span>Explore Dishes</span>
        </Link>

        <Link to="/my-dishes" className="card page-home-card">
          <FaList /> <span>View my dishes</span>
        </Link>

        <Link to="/new-dish" className="card page-home-card">
          <FaCarrot /> <span>Add a dish</span>
        </Link>

        <Link to="/random" className="card page-home-card">
          <FaQuestionCircle /> <span>Get random dish</span>
        </Link>
      </div>
    </div>
  );
}

export default Home;
