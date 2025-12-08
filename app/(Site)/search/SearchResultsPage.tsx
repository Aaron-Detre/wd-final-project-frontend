/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import RecipeInfoCard from "../(Account)/profile/RecipeInfoCard";
import { useEffect, useState } from "react";
import * as recipesClient from "../Clients/recipeClient";
import SearchBar from "./SearchBar";
import { useSearchParams } from "next/navigation";

export default function SearchResultsPage() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const criteria = useSearchParams().get("criteria");
  const searchApiRecipes = async (searchParam: string) => {
    const recipes = await recipesClient.filterRecipesByTitle(searchParam);
    setRecipes(recipes instanceof Array ? recipes : []);
  };

  useEffect(() => {
    if (criteria) searchApiRecipes(criteria);
  }, [criteria]);

  return (
    <div className="wdf-search-container">
      <SearchBar />
      {recipes.length > 0 ? (
        <div className="wdf-search-results">
          {recipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="wdf-search-result wdf-border-light shadow"
            >
              <Link href={`/details/${recipe.idMeal}/api?fromSearch=true`}>
                <RecipeInfoCard
                  title={recipe.strMeal}
                  img={recipe.strMealThumb}
                  vertical={true}
                />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="mt-5">No recipes found...</h1>
      )}
    </div>
  );
}
