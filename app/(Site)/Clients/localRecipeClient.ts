import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const RECIPES_API = `${HTTP_SERVER}/api/recipes`;

//TODO: axios or axiosWithCredentials?
export const filterRecipesByTitle = async (query: string) => {
  const response = await axios.get(`${RECIPES_API}?title=${query}`);
  return response.data;
};
export const getRecipeById = async (recipeId: string) => {
  const response = await axiosWithCredentials.get(
    `${RECIPES_API}?id=${recipeId}`
  );
  return response.data;
};
export const getAllLocalRecipes = async () => {
  const response = await axios.get(`${RECIPES_API}`);
  return response.data;
};
export const getFollowingRecipes = async (userId: string) => {
  const response = await axios.get(`${RECIPES_API}/following/${userId}`);
  return response.data;
};
