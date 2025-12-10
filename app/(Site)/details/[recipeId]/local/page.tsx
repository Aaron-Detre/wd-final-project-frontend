/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

//TODO: INSANE DUPLICATION!!!!

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as localRecipeClient from "../../../Clients/localRecipeClient";
import { Button, Col, Image, Row } from "react-bootstrap";
import "../../detailsStyles.css";
import { Ingredient } from "@/app/(Site)/UtilClasses/Types";
import InstructionsCard from "../InstructionsCard";
import IngredientsCard from "../IngredientsCard";
import ReviewsCard from "../ReviewsCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/(Site)/store";
import { IoArrowBack } from "react-icons/io5";
import BackButton from "../BackButton";
import Link from "next/link";
import FlexGap from "@/app/(Site)/UtilClasses/FlexGap";
import { setTitle } from "@/app/(Site)/reducer";
const defaultImage = "/images/plate.svg";

// const firstLetterToUppercase = (str: string) =>
//   str.charAt(0).toUpperCase() + str.slice(1);

export default function ApiRecipeDetails() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTitle("Recipe Details"));
  }, [dispatch]);

  const fromSearch = useSearchParams().get("fromSearch");
  const { currentUser } = useSelector((state: RootState) => state.account);
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState<any>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [hasImage, setHasImage] = useState(true);

  const fetchRecipeDetails = async () => {
    const recipeDetails = await localRecipeClient.getRecipeById(
      recipeId as string
    );
    setRecipe(recipeDetails);
    setIngredients(recipeDetails.ingredients);
    setInstructions(recipeDetails.instructions);
    setHasImage(recipeDetails.img !== undefined);
  };
  useEffect(() => {
    fetchRecipeDetails();
  }, [recipeId]);

  return (
    <div className="wdf-details-container">
      <div className="wdf-details-top-row">
        <Col xs={hasImage ? 8 : 12} className="wdf-details-left">
          <div className="d-flex align-items-center">
            <BackButton />
            <h1 className="wdf-details-title">
              {fromSearch && <IoArrowBack />}
              {recipe?.recipeTitle}
            </h1>
            <FlexGap />
            <div className={hasImage ? "wdf-details-buttons" : ""}>
              <Button
                variant="primary"
                className="me-2"
                disabled={!currentUser || currentUser.role === "AUTHOR"}
                href={`/editor/review?localRecipe=${recipeId}`}
              >
                Review
              </Button>
              <Button
                variant="warning"
                disabled={!currentUser || currentUser.role === "REVIEWER"}
                href={`/editor?localRecipe=${recipeId}`}
              >
                Remix
              </Button>
            </div>
          </div>
          <div className="wdf-details-author">
            <span>
              By{" "}
              <Link href={`/profile/${recipe?.recipeAuthor._id}`}>
                {recipe?.recipeAuthor.username}
              </Link>
            </span>
          </div>

          <div className="wdf-details-body">
            <Row>
              <Col xl={5}>
                <IngredientsCard ingredients={ingredients} />
              </Col>
              <Col xl={7}>
                <InstructionsCard instructions={instructions} />
              </Col>
            </Row>
          </div>
        </Col>
        {hasImage && (
          <Col xs={4} className="wdf-details-right">
            <Image
              src={recipe?.strMealThumb ? recipe.strMealThumb : defaultImage}
              className="wdf-details-image"
            />
          </Col>
        )}
      </div>
      <div className="wdf-details-bottom-row">
        <ReviewsCard isReviewOfLocalRecipe={true} />
      </div>
    </div>
  );
}
