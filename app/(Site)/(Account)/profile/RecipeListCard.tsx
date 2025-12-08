import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Recipe } from "../../UtilClasses/Types";
import RecipeInfoCard from "./RecipeInfoCard";
import FlexGap from "../../UtilClasses/FlexGap";

export default function RecipeListCard({
  title,
  recipes,
  linkToFullPage,
}: {
  title: string;
  recipes: Recipe[];
  linkToFullPage: string;
}) {
  return (
    <Card className="wdf-profile-authored-list">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <ListGroup className="mb-2">
          {recipes.map(
            (recipe: Recipe, index: number) =>
              index < 5 && (
                <ListGroupItem
                  key={recipe._id}
                  action
                  href={`/details/${recipe._id}/local`}
                >
                  <RecipeInfoCard title={recipe.recipeTitle} />
                </ListGroupItem>
              )
          )}
        </ListGroup>
        {recipes.length > 5 && (
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
