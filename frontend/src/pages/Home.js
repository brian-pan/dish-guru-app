import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

function Home() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <section className="heading">
        <h1>Welcome back{user ? ", " + user.name : " to SpicesGuru"}</h1>
        <p>Please choose from an option below</p>
      </section>

      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle /> Explore dishes
      </Link>

      <Link to="/tickets" className="btn btn-block">
        <FaTicketAlt /> View my dishes
      </Link>
      <Link to="/tickets" className="btn btn-block">
        <FaTicketAlt /> Create a recipe
      </Link>
      <Link to="/tickets" className="btn btn-block">
        <FaQuestionCircle /> Get random dish
      </Link>
    </>
  );
}

export default Home;
