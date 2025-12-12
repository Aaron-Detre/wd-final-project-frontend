/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import Link from "next/link";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import * as localRecipeClient from "../Clients/localRecipeClient";
import * as reviewClient from "../Clients/reviewClient";
import displayStars from "../UtilClasses/DisplayStars";
import { setTitle } from "../reducer";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTitle("Home"));
  }, [dispatch]);

  const { currentUser } = useSelector((state: RootState) => state.account);
  const [userRecipes, setUserRecipes] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);

  const fiveMostRecent = (array: any[]): any[] => {
    const sorted = array.sort((a, b) => {
      return (
        new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
      );
    });
    return sorted.slice(0, 5);
  };
  const fetchRecentReviews = async () => {
    const reviews = await reviewClient.getAllReviews();
    setReviews(fiveMostRecent(reviews));
  };
  const fetchRecentUserRecipes = async () => {
    const recipes = await localRecipeClient.getAllLocalRecipes();
    setUserRecipes(fiveMostRecent(recipes));
  };
  const fetchFollowingRecentReviews = async (userId: string) => {
    const reviews = await reviewClient.getFollowingReviews(userId);
    setReviews(fiveMostRecent(reviews));
  };
  const fetchFollowingRecentRecipes = async (userId: string) => {
    const recipes = await localRecipeClient.getFollowingRecipes(userId);
    setUserRecipes(fiveMostRecent(recipes));
  };
  useEffect(() => {
    if (currentUser) {
      fetchFollowingRecentReviews(currentUser._id);
      fetchFollowingRecentRecipes(currentUser._id);
    } else {
      fetchRecentReviews();
      fetchRecentUserRecipes();
    }
  }, [currentUser]);

  const abbreviateText = (text: string) => {
    if (text.length >= 100) {
      return text.slice(0, 98) + "...";
    } else {
      return text;
    }
  };

  const authorString = (user: any): string => {
    if (user) {
      if (typeof user === "string") {
        return user;
      } else {
        return user.username;
      }
    } else {
      return "";
    }
  };

  return (
    <div>
      <div className="wdf-anonymous-page d-xl-flex gap-4 ms-4 me-4">
        <Col>
          <Card className="mb-4 shadow bg-white rounded">
            <Card.Header>
              <Card.Title className="mt-1">
                Recent{" "}
                {currentUser
                  ? "recipes from accounts you follow"
                  : "User-Created Recipes"}
              </Card.Title>
            </Card.Header>
            <Card.Body>
              {userRecipes.length > 0 ? (
                userRecipes.map((recipe, index) => (
                  <Card
                    key={recipe._id}
                    className={`w-100 ${
                      index === userRecipes.length - 1 ? "" : "mb-2"
                    }`}
                  >
                    <Row className="no-gutters">
                      <Col>
                        <Link href={`/profile/${recipe.recipeAuthor._id}`}>
                          <CardImg src={recipe.img ?? "/images/plate.svg"} />
                        </Link>
                      </Col>
                      <Col>
                        <CardBody>
                          <CardTitle
                            as={Link}
                            href={`details/${recipe._id}/local`}
                            className="wdf-header"
                          >
                            {recipe.recipeTitle}
                          </CardTitle>
                          <CardText>
                            By{" "}
                            <Link href={`/profile/${recipe.recipeAuthor._id}`}>
                              {authorString(recipe.recipeAuthor.username)}
                            </Link>
                          </CardText>
                        </CardBody>
                      </Col>
                    </Row>
                  </Card>
                ))
              ) : (
                <h4 className="mt-4">No recent user recipes...</h4>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="mb-4 shadow bg-white rounded">
            <Card.Header>
              <Card.Title className="mt-1">
                Recent{" "}
                {currentUser
                  ? "reviews from accounts you follow"
                  : "Recipe Reviews"}
              </Card.Title>
            </Card.Header>
            <Card.Body>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <Card
                    key={review._id}
                    className={`w-100 ${
                      index === userRecipes.length - 1 ? "" : "mb-2"
                    }`}
                  >
                    <Row className="no-gutters">
                      <Col>
                        {/* TODO: review.recipe.img??? */}
                        {/* TODO: link duplication */}
                        <Link
                          href={`details/${
                            review.localRecipeId || review.apiRecipeId
                          }/${review.localRecipeId ? "local" : "api"}/review/${
                            review._id
                          }`}
                        >
                          <CardImg src={"/images/plate.svg"} />
                        </Link>
                      </Col>
                      <Col>
                        <CardBody>
                          <CardTitle
                            as={Link}
                            href={`details/${
                              review.localRecipeId || review.apiRecipeId
                            }/${
                              review.localRecipeId ? "local" : "api"
                            }/review/${review._id}`} //TODO: ?????
                            className="wdf-header"
                          >
                            {/* {review.recipe.recipeTitle} //TODO: ?? */}
                            {review.reviewTitle}
                          </CardTitle>
                          <CardText className="d-flex align-items-center">
                            <span className="me-2">
                              <Link
                                href={`/profile/${review.reviewAuthor._id}`}
                              >
                                {review.reviewAuthor.username}
                              </Link>
                            </span>
                            {displayStars(review.stars)}
                          </CardText>
                          <CardText>{abbreviateText(review.text)}</CardText>
                        </CardBody>
                      </Col>
                    </Row>
                  </Card>
                  // </ListGroupItem>
                ))
              ) : (
                <h4 className="mt-4">No recent reviews...</h4>
              )}
              {/* </ListGroup> */}
            </Card.Body>
          </Card>
        </Col>
      </div>
      <hr />
      <div>
        <h5>
          Frontend:{" "}
          <Link href="https://github.com/Aaron-Detre/wd-final-project-frontend">
            https://github.com/Aaron-Detre/wd-final-project-frontend
          </Link>
        </h5>
        <h5>
          Backend:{" "}
          <Link href="https://github.com/Aaron-Detre/wd-final-project-backend">
            https://github.com/Aaron-Detre/wd-final-project-backend
          </Link>
        </h5>
        <h5>Team members: Aaron Detre</h5>
        <h5>Section: CS4550 01</h5>
      </div>
    </div>
  );
}
