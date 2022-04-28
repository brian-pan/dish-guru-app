import { Link } from "react-router-dom";
import { FaQuestionCircle, FaGlobe, FaCarrot, FaList } from "react-icons/fa";
import { useSelector } from "react-redux";

function Home() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="page">
      <section className="page-heading">
        <h1>Welcome {user ? "back, " + user.name : " to DishGuru"}</h1>
        <p>Please choose an option from below</p>
      </section>

      <div className="page-home-mobile">
        <div>
          <Link to="/dishes">
            <FaGlobe />
            Explore Dishes
          </Link>
        </div>
        <div>
          <Link to="/my-dishes">
            <FaList /> View my dishes
          </Link>
        </div>
        <div>
          <Link to="/new-dish">
            <FaCarrot /> Add a dish
          </Link>
        </div>
        <div>
          <Link to="/random">
            <FaQuestionCircle /> Get random dish
          </Link>
        </div>
      </div>

      <div className="page-home-pad">
        <div>
          <Link to="/dishes">
            <FaGlobe />
            Explore Dishes
          </Link>
        </div>
        <div>
          <Link to="/my-dishes">
            <FaList /> View my dishes
          </Link>
        </div>
        <div>
          <Link to="/new-dish">
            <FaCarrot /> Add a dish
          </Link>
        </div>
        <div>
          <Link to="/random">
            <FaQuestionCircle /> Get random dish
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
