import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

function Home() {
  return (
    <>
      <section className="heading">
        <h1>TITLE</h1>
        <p>DESCRIPTION</p>
      </section>

      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle /> Example Button 1
      </Link>

      <Link to="/tickets" className="btn btn-block">
        <FaTicketAlt /> Example Button 2
      </Link>
    </>
  );
}

export default Home;
