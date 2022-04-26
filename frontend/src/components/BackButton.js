import { Link } from "react-router-dom";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";

function BackButton({ url }) {
  return (
    <Link to={url} className="btn btn-back">
      <ArrowCircleLeftOutlinedIcon />
      Back
    </Link>
  );
}
export default BackButton;
