import { Link } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";

function AddButton({ url }) {
  return (
    <Link to={url} className="btn btn-back">
      <IoIosAddCircleOutline />
      New
    </Link>
  );
}
export default AddButton;
