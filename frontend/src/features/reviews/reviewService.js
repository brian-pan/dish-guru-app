import axios from "axios";

const API_URL_PU = "/api/dishes/";
const API_URL_MY = "/api/my-dishes/";

//create a review
const createReview = async (dishId, reviewFormData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_URL_PU + dishId + "/reviews",
    reviewFormData,
    config
  );

  return response.data;
};

//get all reviews of dishes (public)
const getReviews = async (dishId) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const response = await axios.get(API_URL_PU + dishId + "/reviews");

  return response.data;
};

const dishService = {
  getReviews,
  createReview,
};

export default dishService;
