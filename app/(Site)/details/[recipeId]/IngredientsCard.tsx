import {
  Card,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { Ingredient, IngredientWithId } from "../../UtilClasses/Types";
import { v4 as uuidv4 } from "uuid";

export default function IngredientsCard({
  ingredients,
}: {
  ingredients: Ingredient[];
}) {
  const addId = (ingredient: Ingredient) => {
    return { ...ingredient, id: uuidv4() };
  };
  const ingredientsWithIds: IngredientWithId[] = ingredients.map(addId);

  return (
    <Card className="wdf-details-ingredients shadow">
      <CardHeader>Ingredients</CardHeader>
      <CardBody>
        <ListGroup className="wdf-details-ingredients-list">
          {ingredients.length > 0 ? (
            ingredientsWithIds.map((ingredientWithId: IngredientWithId) => (
              <ListGroupItem key={ingredientWithId.id}>
                <span>{ingredientWithId.ingredient}</span>
                {ingredientWithId.measure && (
                  <span>{" - " + ingredientWithId.measure}</span>
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
