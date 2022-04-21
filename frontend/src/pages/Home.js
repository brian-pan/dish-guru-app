import { Link } from "react-router-dom";
import { FaQuestionCircle, FaGlobe, FaCarrot, FaList } from "react-icons/fa";
import { useSelector } from "react-redux";

function Home() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <section className="heading">
        <h1>Welcome {user ? "back, " + user.name : " to SpicesGuru"}</h1>
        <p>Please choose an option from below</p>
      </section>

      <div className="home-links">
        <Link to="/dishes" className="btn btn-block">
          <FaGlobe />
          Explore Dishes
        </Link>

        <Link to="/my-dishes" className="btn btn-block">
          <FaList /> View my dishes
        </Link>
        <Link to="/new-dish" className="btn btn-block">
          <FaCarrot /> Add a dish
        </Link>
        <Link to="/random" className="btn btn-block">
          <FaQuestionCircle /> Get random dish
        </Link>
      </div>
    </>
  );
}

export default Home;
