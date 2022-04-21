import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createDish, reset } from "../features/dishes/dishSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function NewDish() {
  //global state
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.dishes
  );
  //local state
  const [username] = useState(user.name);
  const [formData, setFormData] = useState({
    name: "",
    diet: "Normal",
    description: "",
    steps: "",
    isPublic: false,
  });
  const { name, diet, description, steps, isPublic } = formData;

  //initialize
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //reset state
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      console.log("newdish");
      dispatch(reset());
      navigate("/my-dishes");
      toast.success("Dish Created!", {
        autoClose: 1000,
      });
    }
    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createDish(formData)); // axios post
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <BackButton url="/" />
        <h1>Add new dish</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className="form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={username}
            disabled
          />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Dish Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={name}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="diet">Diet Type</label>
            <select name="diet" id="diet" value={diet} onChange={onChange}>
              <option value="Normal">Normal</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="steps">Cooking Instruction Steps</label>
            <textarea
              name="steps"
              id="steps"
              className="form-control"
              placeholder="Steps 1, 2, 3..."
              value={steps}
              onChange={onChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="description">
              Brief Description of dish (Optional)
            </label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={onChange}
            ></textarea>
          </div>
          <div>{/* isPublic checkbox here */}</div>
          <div className="form-group">
            <button className="btn btn-block">Add</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewDish;
