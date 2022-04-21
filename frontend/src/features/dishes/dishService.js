import axios from "axios";

const API_URL_PU = "/api/dishes/";
const API_URL_MY = "/api/my-dishes/";

//create new dish
const createDish = async (dishData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL_MY, dishData, config);
  return response.data;
};

//get all private dishes
const getMyDishes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL_MY, config);

  return response.data;
};

//get private dish (show page)
const getMyDish = async (dishId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL_MY + dishId, config);

  return response.data;
};

const dishService = {
  createDish,
  getMyDishes,
  getMyDish,
};

export default dishService;
