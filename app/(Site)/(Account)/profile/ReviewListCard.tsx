import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Review } from "../../UtilClasses/Types";
import ReviewInfoCard from "./ReviewInfoCard";
import FlexGap from "../../UtilClasses/FlexGap";
import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";
import * as reviewClient from "../../Clients/reviewClient";
export default function ReviewListCard({
  title,
  reviews,
  setReviews,
  linkToFullPage,
  isYourProfile,
}: {
  title: string;
  reviews: Review[];
  setReviews: Function;
  linkToFullPage?: string;
  isYourProfile: boolean;
}) {
  const handleDeleteClicked = async (reviewId: string) => {
    if (confirm("Are you sure you want to permanently delete this review?")) {
      await reviewClient.deleteReview(reviewId);
      setReviews(reviews.filter((review: Review) => review._id !== reviewId));
    }
  };
  return (
    <Card className="wdf-profile-review-list">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <ListGroup className="mb-2">
          {reviews.map(
            (review: Review, index: number) =>
              (!linkToFullPage || index < 5) && (
                <ListGroupItem
                  key={review._id}
                  className="d-flex wdf-info-card-hover"
                >
                  <Link
                    className="wdf-flex-gap wdf-text-decoration-none"
                    href={`/details/${
                      review.apiRecipeId || review.localRecipeId
                    }/${review.apiRecipeId ? "api" : "local"}/review/${
                      review._id
                    }`}
                  >
                    <ReviewInfoCard title={review.reviewTitle} />
                  </Link>
                  {isYourProfile && (
                    <FaTrashAlt
                      onClick={() => handleDeleteClicked(review._id)}
                      className="fs-5 wdf-cursor-pointer"
                    />
                  )}
                </ListGroupItem>
              )
          )}
        </ListGroup>
        {reviews.length > 5 && linkToFullPage && (
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
