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

//get all public dishes
const getPublicDishes = async () => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const response = await axios.get(API_URL_PU);
  return response.data;
};

//get single private dish (show page)
const getMyDish = async (dishId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL_MY + dishId, config);

  return response.data;
};

//get single public dish (show page)
const getPublicDish = async (dishId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL_PU + dishId, config);

  return response.data;
};

//update single private dish
const updateDish = async (dishId, formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL_MY + dishId, formData, config);

  return response.data;
};

//delete private dish
const deleteDish = async (dishId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL_MY + dishId, config);

  return response.data;
};

const dishService = {
  createDish,
  getMyDishes,
  getMyDish,
  getPublicDishes,
  getPublicDish,
  updateDish,
  deleteDish,
};

export default dishService;
