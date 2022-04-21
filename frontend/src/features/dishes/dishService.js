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

const dishService = {
  createDish,
};

export default dishService;
