import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Recipe } from "../../UtilClasses/Types";
import RecipeInfoCard from "./RecipeInfoCard";

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
    <Card className="w-25">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <ListGroup>
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
          <Button variant="primary" href={linkToFullPage}>
            See more
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
