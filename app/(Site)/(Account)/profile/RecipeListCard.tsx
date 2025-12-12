import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Recipe } from "../../UtilClasses/Types";
import RecipeInfoCard from "./RecipeInfoCard";
import FlexGap from "../../UtilClasses/FlexGap";
import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";
import * as localRecipeClient from "../../Clients/localRecipeClient";

export default function RecipeListCard({
  title,
  recipes,
  setRecipes,
  linkToFullPage,
  isYourProfile,
}: {
  title: string;
  recipes: Recipe[];
  setRecipes: Function;
  linkToFullPage?: string;
  isYourProfile: boolean;
}) {
  const handleDeleteClicked = async (recipeId: string) => {
    if (confirm("Are you sure you want to permanently delete this recipe?")) {
      await localRecipeClient.deleteRecipe(recipeId);
      setRecipes(recipes.filter((recipe: Recipe) => recipe._id !== recipeId));
    }
  };
  return (
    <Card className="wdf-profile-authored-list">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <ListGroup className="mb-2">
          {recipes.map(
            (recipe: Recipe, index: number) =>
              (!linkToFullPage || index < 5) && (
                <ListGroupItem
                  key={recipe._id}
                  className="d-flex wdf-info-card-hover"
                >
                  <Link
                    className="wdf-flex-gap wdf-text-decoration-none"
                    href={`/details/${recipe._id}/local`}
                  >
                    <RecipeInfoCard title={recipe.recipeTitle} />
                  </Link>
                  {isYourProfile && (
                    <FaTrashAlt
                      onClick={() => handleDeleteClicked(recipe._id)}
                      className="fs-5 wdf-cursor-pointer"
                    />
                  )}
                </ListGroupItem>
              )
          )}
        </ListGroup>
        {linkToFullPage && recipes.length > 5 && (
          <div className="d-flex">
            <FlexGap />
            <Button variant="primary" href={linkToFullPage}>
              See more
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
