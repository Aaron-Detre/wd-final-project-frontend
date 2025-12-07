import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Review } from "../../UtilClasses/Types";
import ReviewInfoCard from "./ReviewInfoCard";

const abbreviateText = (text: string) => {
  if (text && text.length >= 150) {
    return text.slice(0, 158) + "...";
  } else {
    return text;
  }
};

export default function ReviewListCard({
  title,
  reviews,
  linkToFullPage,
}: {
  title: string;
  reviews: Review[];
  linkToFullPage: string;
}) {
  return (
    <Card className="w-25">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <ListGroup>
          {reviews.map(
            (review: Review, index: number) =>
              index < 5 && (
                <ListGroupItem
                  key={review._id}
                  action
                  href={`/details/${review.apiRecipeId ? "api" : "local"}/${
                    review.apiRecipeId || review.localRecipeId
                  }/review/${review._id}`}
                >
                  <ReviewInfoCard
                    title={review.reviewTitle}
                    text={abbreviateText(review.text)}
                  />
                </ListGroupItem>
              )
          )}
        </ListGroup>
        {reviews.length > 5 && (
          <Button variant="primary" href={linkToFullPage}>
            See more
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
