import axios from "axios";
import { Review } from "../UtilClasses/Types";
const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const REVIEWS_API = `${HTTP_SERVER}/api/reviews`;

export const getAllReviewsForApiRecipe = async (recipeId: string) => {
  const response = await axiosWithCredentials.get(
    `${REVIEWS_API}/api/${recipeId}`
  );
  return response.data;
};
export const getAllReviewsForLocalRecipe = async (recipeId: string) => {
  const response = await axiosWithCredentials.get(
    `${REVIEWS_API}/local/${recipeId}`
  );
  return response.data;
};
export const getAllReviews = async () => {
  const response = await axiosWithCredentials.get(`${REVIEWS_API}`);
  return response.data;
};
export const getFollowingReviews = async (userId: string) => {
  const response = await axiosWithCredentials.get(
    `${REVIEWS_API}/following/${userId}`
  );
  return response.data;
};
export const getReviewById = async (reviewId: string) => {
  const response = await axiosWithCredentials.get(`${REVIEWS_API}/${reviewId}`);
  return response.data;
};
export const createReview = async (review: Review) => {
  const response = await axiosWithCredentials.put(`${REVIEWS_API}`, review);
  return response.data;
};
