/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as localRecipeClient from "../../Clients/localRecipeClient";
import * as recipeClient from "../../Clients/recipeClient";
import * as reviewClient from "../../Clients/reviewClient";
import { Card } from "react-bootstrap";
import Link from "next/link";
import "./reviewStyles.css";
import displayStars from "@/app/(Site)/UtilClasses/DisplayStars";
import BackButton from "./BackButton";
import { useDispatch } from "react-redux";
import { setTitle } from "../../reducer";
const defaultImage = "/images/plate.svg";

export default function RecipeReview({
  isLocalRecipeReview,
}: {
  isLocalRecipeReview: boolean;
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTitle("Review"));
  }, [dispatch]);

  const { recipeId, reviewId } = useParams();
  const [recipe, setRecipe] = useState<any>(null);
  const [review, setReview] = useState<any>(null);

  const fetchRecipe = async () => {
    const recipeData = isLocalRecipeReview
      ? await localRecipeClient.getRecipeById(recipeId as string)
      : await recipeClient.getRecipeById(recipeId as string);
    setRecipe(recipeData);
  };
  const fetchReview = async () => {
    const reviewData = await reviewClient.getReviewById(reviewId as string);
    setReview(reviewData);
  };

  useEffect(() => {
    fetchRecipe();
    fetchReview();
  }, [recipeId, reviewId]);

  return (
    <div className="wdf-review d-flex">
      <div className="wdf-review-back-button">
        <BackButton />
      </div>
      <div className="wdf-review-content">
        <Card
          as={Link}
          href={`/details/${recipe?._id}/${
            isLocalRecipeReview ? "local" : "api"
          }`}
          className="wdf-review-recipe-card shadow"
        >
          {/* // TODO: HEADER? */}
          <Card.Img
            src={recipe?.strMealThumb ?? defaultImage}
            className="wdf-review-recipe-image"
          />
          <Card.Body>
            <Card.Title className="wdf-review-recipe-title">
              {isLocalRecipeReview ? recipe?.recipeTitle : recipe?.strMeal}
            </Card.Title>
          </Card.Body>
        </Card>
        <h1 className="wdf-review-title">{review?.reviewTitle}</h1>
        <div className="d-flex align-items-center">
          <span className="wdf-review-author">
            By{" "}
            <Link href={`/profile/${review?.reviewAuthor._id}`}>
              {review?.reviewAuthor.username}
            </Link>
          </span>
          {displayStars(review?.stars)}
        </div>
        <p className="wdf-review-text">{review?.text}</p>
      </div>
    </div>
  );
}
