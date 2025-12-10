/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { useEffect, useState } from "react";
import * as reviewClient from "../Clients/reviewClient";
import * as recipeClient from "../Clients/recipeClient";
import SearchBar from "./SearchBar";
import { useSearchParams } from "next/navigation";
import { Button, Image, OverlayTrigger, Popover } from "react-bootstrap";
import { IoMdInformationCircleOutline } from "react-icons/io";
import "../(Account)/profile/infoCardStyles.css";
import { Recipe, Review } from "../UtilClasses/Types";

export default function SearchResultsPage() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [apiRecipeReviews, setApiRecipeReviews] = useState<Review[][]>([]);
  const criteria = useSearchParams().get("criteria");
  const searchApiRecipes = async (searchParam: string) => {
    const recipes = await recipeClient.filterRecipesByTitle(searchParam);
    setRecipes(recipes instanceof Array ? recipes : []);
  };

  const fetchReviews = async () => {
    const ids = recipes.map((recipe) => recipe.idMeal);
    const reviews = await reviewClient.getReviewsForSomeRecipes(ids);
    console.log(JSON.stringify(reviews));
    setApiRecipeReviews(reviews);
  };
  useEffect(() => {
    fetchReviews();
  }, [recipes]);

  useEffect(() => {
    if (criteria) searchApiRecipes(criteria);
  }, [criteria]);

  const popover = (recipeDetails: any) => {
    const reviewsForRecipe = apiRecipeReviews
      .filter((reviews: Review[]) =>
        reviews.some(
          (review: Review) => review.apiRecipeId === recipeDetails.idMeal
        )
      )
      ?.at(0);
    const avg = (reviews: Review[]) => {
      const stars = reviews.map((review) => review.stars);
      if (stars && stars.length !== 0) {
        let sum = 0;
        stars.forEach((star) => (sum += star));
        return (sum / stars.length).toFixed(2);
      } else {
        return "N/A";
      }
    };
    return (
      <Popover>
        <Popover.Body>
          {/* // # reviews // avg review score // # remixes? */}
          <h1># Reviews: {reviewsForRecipe?.length}</h1>
          <h1>Avg stars: {avg(reviewsForRecipe ?? [])}</h1>
        </Popover.Body>
      </Popover>
    );
  };

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
              <div className="wdf-info-card wdf-vertical">
                <Link href={`/details/${recipe.idMeal}/api?fromSearch=true`}>
                  <div className="wdf-info-card-image">
                    <Image
                      src={recipe.strMealThumb}
                      className="wdf-info-card-image-thumbnail"
                    />
                  </div>
                </Link>
                <div className="wdf-info-card-body">
                  <div className="wdf-info-card-body-header ">
                    <Link
                      href={`/details/${recipe.idMeal}/api?fromSearch=true`}
                    >
                      <span>{recipe.strMeal}</span>
                    </Link>
                    <OverlayTrigger
                      trigger="click"
                      placement="top"
                      overlay={popover(recipe)}
                    >
                      <IoMdInformationCircleOutline className="float-end fs-3 wdf-cursor-pointer" />
                    </OverlayTrigger>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="mt-5">No recipes found...</h1>
      )}
    </div>
  );
}
