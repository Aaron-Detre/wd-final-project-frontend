"use client";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Container,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { use, useState } from "react";
import Link from "next/link";
import SignInModal from "../../No longer using/SignInModal";
import FlexGap from "../UtilClasses/FlexGap";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Recipe, Review, User } from "../UtilClasses/Types";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const genericRecipe: Recipe = {
    _id: uuidv4(),
    recipeTitle: "Default",
    recipeAuthor: "Default",
    datePosted: new Date(),
  };
  const genericUser: User = {
    _id: uuidv4(),
    username: "Default",
    password: "Default",
    role: "BOTH",
  };
  const genericDate = new Date();
  const userRecipes: Recipe[] = [
    {
      _id: "1",
      recipeTitle: "Example Recipe 1",
      img: "/images/test.jpg",
      recipeAuthor: "Aaron Detre",
      datePosted: genericDate,
    },
    {
      _id: "2",
      recipeTitle: "Example Recipe 2",
      img: "/images/test.jpg",
      recipeAuthor: "Aaron Detre",
      datePosted: genericDate,
    },
    {
      _id: "3",
      recipeTitle: "Example Recipe 3",
      img: "/images/test.jpg",
      recipeAuthor: "Aaron Detre",
      datePosted: genericDate,
    },
    {
      _id: "4",
      recipeTitle: "Example Recipe 4",
      img: "/images/test.jpg",
      recipeAuthor: "Aaron Detre",
      datePosted: genericDate,
    },
    {
      _id: "5",
      recipeTitle: "Example Recipe 5",
      img: "/images/test.jpg",
      recipeAuthor: "Aaron Detre",
      datePosted: genericDate,
    },
  ];

  const recentReviews: Review[] = [
    {
      _id: "1",
      recipe: userRecipes.at(2) ?? genericRecipe,
      reviewTitle: "Gross",
      reviewAuthor: genericUser,
      stars: 0,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet magna vestibulum, congue tellus in, semper felis. Curabitur facilisis hendrerit magna, eu sagittis",
      datePosted: genericDate,
    },
    {
      _id: "2",
      recipe: userRecipes.at(0) ?? genericRecipe,
      reviewTitle: "Pretty good recipe",
      reviewAuthor: genericUser,
      stars: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet magna vestibulum, congue tellus in, semper felis. Curabitur facilisis hendrerit magna, eu sagittis",
      datePosted: genericDate,
    },
    {
      _id: "3",
      recipe: userRecipes.at(4) ?? genericRecipe,
      reviewTitle: "Fine",
      reviewAuthor: genericUser,
      stars: 3,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet magna vestibulum, congue tellus in, semper felis. Curabitur facilisis hendrerit magna, eu sagittis",
      datePosted: genericDate,
    },
    {
      _id: "4",
      recipe: userRecipes.at(0) ?? genericRecipe,
      reviewTitle: "good recipe",
      reviewAuthor: genericUser,
      stars: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet magna vestibulum, congue tellus in, semper ",
      datePosted: genericDate,
    },
  ];

  const displayStars = (stars: number) => {
    const starIcons = [];
    for (let i = 0; i < 5; i++) {
      if (i <= stars) {
        starIcons.push(<FaStar key={i} />);
      } else {
        starIcons.push(<FaRegStar key={i} />);
      }
    }
    return starIcons;
  };

  const abbreviateText = (text: string) => {
    if (text.length >= 100) {
      return text.slice(0, 98) + "...";
    } else {
      return text;
    }
  };

  const authorString = (user: User | string): string => {
    if (typeof user === "string") {
      return user;
    } else {
      return user.username;
    }
  };

  return (
    <div className="wdf-anonymous-page d-lg-flex gap-4 ms-4 me-4">
      <Col>
        <Card className="mb-4 shadow p-3 bg-white rounded">
          <Card.Body>
            <Card.Title>Recent User-Created Recipes</Card.Title>
            <ListGroup>
              {userRecipes.map((recipe) => (
                <ListGroupItem
                  key={recipe._id}
                  className="d-flex align-items-center wdf-cursor-pointer"
                >
                  <Card>
                    <Row className="no-gutters">
                      <Col>
                        <CardImg src={recipe.img} />
                      </Col>
                      <Col>
                        <CardBody>
                          <CardTitle
                            as={Link}
                            href={`details/${recipe._id}`}
                            className="wdf-header"
                          >
                            {recipe.recipeTitle}
                          </CardTitle>
                          <CardText>
                            By {authorString(recipe.recipeAuthor)}
                          </CardText>
                        </CardBody>
                      </Col>
                    </Row>
                  </Card>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="mb-4 shadow p-3 bg-white rounded">
          <Card.Body>
            <Card.Title>Recent Recipe Reviews</Card.Title>
            <ListGroup>
              {recentReviews.map((review) => (
                <ListGroupItem
                  key={review._id}
                  className="d-flex align-items-center wdf-cursor-pointer"
                >
                  <Card>
                    <Row className="no-gutters">
                      <Col>
                        <CardImg src={review.recipe.img} />
                      </Col>
                      <Col>
                        <CardBody>
                          <CardTitle
                            as={Link}
                            href={`details/${review.recipe._id}/review/${review._id}`}
                            className="wdf-header"
                          >
                            {review.recipe.recipeTitle}
                          </CardTitle>
                          <CardText className="d-flex align-items-center">
                            <span className="me-2">
                              {review.reviewAuthor.username}
                            </span>
                            {displayStars(review.stars)}
                          </CardText>
                          <CardText>{abbreviateText(review.text)}</CardText>
                        </CardBody>
                      </Col>
                    </Row>
                  </Card>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}
