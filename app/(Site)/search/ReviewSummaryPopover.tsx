import { Popover, Table } from "react-bootstrap";
import { Review } from "../UtilClasses/Types";

export default function ReviewSummaryPopover({
  triggerProps,
  isApiRecipeReview,
  recipeReviews,
  recipeDetails,
}: {
  triggerProps: any;
  isApiRecipeReview: boolean;
  recipeReviews: Review[][];
  recipeDetails: any;
}) {
  const reviewsForRecipe =
    recipeReviews
      .filter((reviews: Review[]) =>
        reviews.some((review: Review) =>
          isApiRecipeReview
            ? review.apiRecipeId === recipeDetails.idMeal
            : review.localRecipeId === recipeDetails._id
        )
      )
      ?.at(0) ?? [];
  const avg = (reviews: Review[]) => {
    const stars = reviews.map((review) => review.stars);
    if (stars && stars.length !== 0) {
      let sum = 0;
      stars.forEach((star) => (sum += star));
      return (sum / stars.length).toFixed(2);
    } else {
      return "N/A";
    }
  };
  return (
    <Popover className="shadow" {...triggerProps}>
      <Popover.Body>
        <Table bordered hover className="wdf-search-result-table">
          <tbody>
            <tr>
              <th>
                <span>Reviews</span>
              </th>
              <td align="center">{reviewsForRecipe?.length ?? 0}</td>
            </tr>
            <tr>
              <th>
                <span>Avg stars</span>
              </th>
              <td align="center">{avg(reviewsForRecipe ?? [])}</td>
            </tr>
          </tbody>
        </Table>
      </Popover.Body>
    </Popover>
  );
}
