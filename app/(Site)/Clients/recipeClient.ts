import axios from "axios";
const MEALDB_API =
  process.env.MEALDB_API ?? "https://www.themealdb.com/api/json/v1/1";

export const filterRecipesByTitle = async (query: string) => {
  const response = await axios.get(`${MEALDB_API}/search.php?s=${query}`);
  return response.data.meals;
};
export const getRecipeById = async (recipeId: string) => {
  const response = await axios.get(`${MEALDB_API}/lookup.php?i=${recipeId}`);
  if (response.data.meals.length === 1) {
    return response.data.meals[0];
  }
};
