import {
  Card,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

export default function InstructionsCard({
  instructions,
}: {
  instructions: string[];
}) {
  return (
    <Card className="wdf-details-instructions shadow">
      <CardHeader>Instructions</CardHeader>
      <CardBody>
        <ListGroup className="wdf-details-ingredients-list" numbered>
          {instructions.length > 0 ? (
            instructions.map((instruction: string, index: number) => (
              <ListGroupItem key={index}>
                <span>{instruction}</span>
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
