import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

function Home() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <section className="heading">
        <h1>Welcome, {user ? user.name : null}</h1>
        <p>Please choose from an option below</p>
      </section>

      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle /> example button 1
      </Link>

      <Link to="/tickets" className="btn btn-block">
        <FaTicketAlt /> example button 2
      </Link>
    </>
  );
}

export default Home;
