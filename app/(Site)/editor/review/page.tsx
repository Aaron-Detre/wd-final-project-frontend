/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import * as localRecipeClient from "../../Clients/localRecipeClient";
import * as recipeClient from "../../Clients/recipeClient";
import * as reviewClient from "../../Clients/reviewClient";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import "../editorStyles.css";
import { Review } from "../../UtilClasses/Types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { v4 as uuidv4 } from "uuid";

export default function ReviewEditor() {
  const { currentUser } = useSelector((state: RootState) => state.account);
  const router = useRouter();
  const searchParams = useSearchParams();
  const apiRecipeId = searchParams.get("apiRecipe");
  const localRecipeId = searchParams.get("localRecipe");
  const [title, setTitle] = useState("");
  // const [hoverStars, setHoverStars] = useState(0); BONUS!!!
  const [stars, setStars] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  let detailsSet = false;

  const setApiRecipeDetails = async (apiRecipeId: string) => {
    if (!detailsSet) {
      const apiRecipe = await recipeClient.getRecipeById(apiRecipeId);
      setTitle(apiRecipe.strMeal);
      detailsSet = true;
    }
  };
  const setLocalRecipeDetails = async (localRecipeId: string) => {
    if (!detailsSet) {
      const localRecipe = await localRecipeClient.getRecipeById(localRecipeId);
      setTitle(localRecipe.recipeTitle);
      detailsSet = true;
    }
  };

  if ((apiRecipeId && localRecipeId) || (!apiRecipeId && !localRecipeId)) {
    history.back();
  } else if (apiRecipeId) {
    setApiRecipeDetails(apiRecipeId);
  } else if (localRecipeId) {
    setLocalRecipeDetails(localRecipeId);
  }

  const handleClickEmptyStar = (index: number) => setStars(index);
  const handleClickFilledStar = (index: number) => {
    if (index === stars) {
      setStars(0);
    } else {
      setStars(index);
    }
  };
  const displayStars = (stars: number) => {
    const starIcons = [];
    for (let i = 1; i < 6; i++) {
      if (i <= stars) {
        starIcons.push(
          <FaStar
            key={i}
            onClick={() => handleClickFilledStar(i)}
            className="wdf-cursor-pointer fs-1"
          />
        );
      } else {
        starIcons.push(
          <FaRegStar
            key={i}
            onClick={() => handleClickEmptyStar(i)}
            className="wdf-cursor-pointer fs-1"
          />
        );
      }
    }
    return starIcons;
  };

  const titleChanges = (e: any) => setReviewTitle(e.target.value);
  const textChanges = (e: any) => setReviewText(e.target.value);

  const publishReview = async () => {
    if (currentUser) {
      const reviewId = uuidv4();
      const author = { _id: currentUser._id, username: currentUser.username };
      const review: Review = {
        _id: reviewId,
        reviewTitle: reviewTitle,
        stars: stars,
        reviewAuthor: author,
        text: reviewText,
        datePosted: new Date(Date.now()),
        apiRecipeId: apiRecipeId ?? undefined,
        localRecipeId: localRecipeId ?? undefined,
      };
      await reviewClient.createReview(review);
      if (apiRecipeId) {
        router.push(`/details/${apiRecipeId}/api/review/${reviewId}`);
      } else {
        router.push(`/details/${localRecipeId}/local/review/${reviewId}`);
      }
    }
  };

  return currentUser ? (
    <div>
      <h1 className="mb-4">Reviewing Recipe: {title}</h1>
      <FormGroup
        className="d-flex align-items-baseline"
        controlId="wdf-editor-review-stars"
      >
        <FormLabel className="wdf-editor-review-form-label me-3">
          Stars:
        </FormLabel>
        {displayStars(stars)}
      </FormGroup>
      <FormGroup controlId="wdf-editor-review-title" className="mt-3">
        <FormLabel className="wdf-editor-review-form-label">
          Review Title
        </FormLabel>
        <FormControl type="text" onChange={titleChanges} required />
      </FormGroup>
      <FormGroup controlId="wdf-editor-review-text" className="mt-3">
        <FormLabel className="wdf-editor-review-form-label">Review</FormLabel>
        <FormControl
          as="textarea"
          type="text"
          rows={5}
          onChange={textChanges}
        />
      </FormGroup>
      <Button className="mt-3" onClick={publishReview}>
        Publish Review
      </Button>
    </div>
  ) : (
    <h1>Sign in to write a review</h1>
  );
}
