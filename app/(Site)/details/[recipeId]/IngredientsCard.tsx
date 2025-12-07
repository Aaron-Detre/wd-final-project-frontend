import {
  Card,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { Ingredient } from "../../UtilClasses/Types";

export default function IngredientsCard({
  ingredients,
}: {
  ingredients: Ingredient[];
}) {
  return (
    <Card className="wdf-details-ingredients shadow">
      <CardHeader>Ingredients</CardHeader>
      <CardBody>
        <ListGroup className="wdf-details-ingredients-list">
          {ingredients.length > 0 ? (
            ingredients.map((ingredient: Ingredient, index: number) => (
              <ListGroupItem key={index}>
                <span>{ingredient.ingredient}</span>
                {ingredient.measure && (
                  <span>{" - " + ingredient.measure}</span>
                )}
              </ListGroupItem>
            ))
          ) : (
            <span>No ingredients...</span>
          )}
        </ListGroup>
      </CardBody>
    </Card>
  );
}
