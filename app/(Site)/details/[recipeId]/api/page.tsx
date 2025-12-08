/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as recipeClient from "../../../Clients/recipeClient";
import { Button, Col, Image, Row } from "react-bootstrap";
import "../../detailsStyles.css";
import { Ingredient } from "@/app/(Site)/UtilClasses/Types";
import InstructionsCard from "../InstructionsCard";
import IngredientsCard from "../IngredientsCard";
import ReviewsCard from "../ReviewsCard";
import { useSelector } from "react-redux";
import { RootState } from "@/app/(Site)/store";
import BackButton from "../BackButton";
const defaultImage = "/images/plate.svg";

const firstLetterToUppercase = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export default function ApiRecipeDetails() {
  const { currentUser } = useSelector((state: RootState) => state.account);
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState<any>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);

  const setIngredientDetails = (recipeDetails: any) => {
    const listIngredients: Ingredient[] = [];
    for (let i = 1; i < 21; i++) {
      if (recipeDetails[`strIngredient${i}`]) {
        const ingredient = recipeDetails[`strIngredient${i}`];
        const measure = recipeDetails[`strMeasure${i}`];
        listIngredients.push({
          ingredient: firstLetterToUppercase(ingredient),
          measure: measure ?? "",
        });
      }
    }
    setIngredients(listIngredients);
  };
  const matchesStepPattern = (str: string) => /^step \d+$/.test(str);

  const setInstructionDetails = (recipeDetails: any) => {
    let listInstructions = recipeDetails.strInstructions.split("\r\n");
    listInstructions = listInstructions.filter(
      (instruction: string) =>
        instruction !== "" && !matchesStepPattern(instruction)
    );
    setInstructions(listInstructions);
  };
  const fetchRecipeDetails = async () => {
    const recipeDetails = await recipeClient.getRecipeById(recipeId as string);
    setRecipe(recipeDetails);
    setIngredientDetails(recipeDetails);
    setInstructionDetails(recipeDetails);
  };
  useEffect(() => {
    fetchRecipeDetails();
  }, [recipeId]);

  return (
    <div className="wdf-details-container">
      <div className="wdf-details-top-row">
        <Col xs={8} className="wdf-details-left">
          <div className="d-flex align-items-center">
            <BackButton />
            <h1 className="wdf-details-title">{recipe?.strMeal}</h1>
            <Button
              variant="primary"
              className="me-2"
              disabled={!currentUser || currentUser.role === "AUTHOR"}
              href={`/editor/review?apiRecipe=${recipeId}`}
            >
              Review
            </Button>
            <Button
              variant="warning"
              disabled={!currentUser || currentUser.role === "REVIEWER"}
              href={`/editor?apiRecipe=${recipeId}`}
            >
              Remix
            </Button>
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
        <Col xs={4} className="wdf-details-right">
          <Image
            src={recipe?.strMealThumb ? recipe.strMealThumb : defaultImage}
            className="wdf-details-image"
          />
        </Col>
      </div>
      <div className="wdf-details-bottom-row">
        <ReviewsCard isReviewOfLocalRecipe={false} />
      </div>
    </div>
  );
}
