export type Path = { link: string; label: string };
export type User = {
  _id: string;
  username: string;
  password: string;
  role: string;
};
export type Recipe = {
  _id: string;
  recipeTitle: string;
  img?: string;
  recipeAuthor: User | string;
  datePosted: Date;
};
export type Review = {
  _id: string;
  reviewTitle: string;
  stars: number;
  recipe: Recipe;
  reviewAuthor: User;
  text: string;
  datePosted: Date;
};
