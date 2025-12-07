import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const REVIEWS_API = `${HTTP_SERVER}/api/reviews`;

export const getAllReviewsForApiRecipe = async (recipeId: string) => {
  const response = await axios.get(`${REVIEWS_API}/api/${recipeId}`);
  return response.data;
};
export const getAllReviewsForLocalRecipe = async (recipeId: string) => {
  const response = await axios.get(`${REVIEWS_API}/local/${recipeId}`);
  return response.data;
};
export const getAllReviews = async () => {
  const response = await axios.get(`${REVIEWS_API}`);
  return response.data;
};
export const getFollowingReviews = async (userId: string) => {
  const response = await axios.get(`${REVIEWS_API}/following/${userId}`);
  return response.data;
};
export const getReviewById = async (reviewId: string) => {
  const response = await axios.get(`${REVIEWS_API}/${reviewId}`);
  return response.data;
};
