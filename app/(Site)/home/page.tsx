/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaRegStar, FaStar } from "react-icons/fa";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import * as localRecipeClient from "../Clients/localRecipeClient";
import * as reviewClient from "../Clients/reviewClient";
import displayStars from "../UtilClasses/DisplayStars";

export default function Home() {
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

  // const displayStars = (stars: number) => {
  //   const starIcons = [];
  //   for (let i = 1; i < 6; i++) {
  //     if (i <= stars) {
  //       starIcons.push(<FaStar key={i} />);
  //     } else {
  //       starIcons.push(<FaRegStar key={i} />);
  //     }
  //   }
  //   return starIcons;
  // };

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
        console.log(user);
        return user.username;
      }
    } else {
      return "";
    }
  };

  return (
    <div className="wdf-anonymous-page d-xl-flex gap-4 ms-4 me-4">
      <Col>
        <Card className="mb-4 shadow p-3 bg-white rounded">
          <Card.Body>
            <Card.Title>Recent User-Created Recipes</Card.Title>
            <ListGroup>
              {userRecipes.length > 0 ? (
                userRecipes.map((recipe) => (
                  <ListGroupItem
                    key={recipe._id}
                    // as={Link}
                    // href={`details/${recipe._id}/local`}
                    className="d-flex align-items-center"
                  >
                    <Card className="w-100">
                      <Row className="no-gutters">
                        <Col>
                          <CardImg src={recipe.img ?? "/images/plate.svg"} />
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
                              <Link
                                href={`/profile/${recipe.recipeAuthor._id}`}
                              >
                                {authorString(recipe.recipeAuthor.username)}
                              </Link>
                            </CardText>
                          </CardBody>
                        </Col>
                      </Row>
                    </Card>
                  </ListGroupItem>
                ))
              ) : (
                <h4 className="mt-4">No recent user recipes...</h4>
              )}
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="mb-4 shadow p-3 bg-white rounded">
          <Card.Body>
            <Card.Title>Recent Recipe Reviews</Card.Title>
            <ListGroup>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <ListGroupItem
                    key={review._id}
                    className="d-flex align-items-center wdf-cursor-pointer"
                  >
                    <Card>
                      <Row className="no-gutters">
                        <Col>
                          {/* TODO: review.recipe.img??? */}
                          <CardImg src={"/images/plate.svg"} />
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
                  </ListGroupItem>
                ))
              ) : (
                <h4 className="mt-4">No recent reviews...</h4>
              )}
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}
