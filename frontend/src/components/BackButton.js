import { Link } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";

function BackButton({ url }) {
  return (
    <Link to={url} className="btn btn-back">
      <IoIosArrowDropleft />
      Back
    </Link>
  );
}
export default BackButton;
