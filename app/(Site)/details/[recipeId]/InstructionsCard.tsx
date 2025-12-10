import {
  Card,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { InstructionWithId } from "../../UtilClasses/Types";

export default function InstructionsCard({
  instructions,
}: {
  instructions: string[];
}) {
  const addId = (instruction: string) => {
    return { id: uuidv4(), instruction: instruction };
  };
  const instructionsWithIds: InstructionWithId[] = instructions.map(addId);
  return (
    <Card className="wdf-details-instructions shadow">
      <CardHeader>Instructions</CardHeader>
      <CardBody>
        <ListGroup className="wdf-details-ingredients-list" numbered>
          {instructions.length > 0 ? (
            instructionsWithIds.map((instruction: InstructionWithId) => (
              <ListGroupItem key={instruction.id}>
                <span>{instruction.instruction}</span>
              </ListGroupItem>
            ))
          ) : (
            <span>No instructions...</span>
          )}
        </ListGroup>
      </CardBody>
    </Card>
  );
}
