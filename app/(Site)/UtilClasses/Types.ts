export type Path = { link: string; label: string };
export type User = {
  _id: string;
  username: string;
  password: string;
  role: string;
  following: string[];
};
export type Recipe = {
  _id: string;
  recipeTitle: string;
  img?: string;
  recipeAuthor: User | { _id: string; username: string };
  datePosted: Date;
  ingredients: Ingredient[];
};
export type Ingredient = {
  ingredient: string;
  measure: string;
};
export type Review = {
  _id: string;
  reviewTitle: string;
  stars: number;
  reviewAuthor: { _id: string; username: string };
  text: string;
  datePosted: Date;
  apiRecipeId?: string;
  localRecipeId?: string;
};
