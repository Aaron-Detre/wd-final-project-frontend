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
import { useState } from "react";
import Link from "next/link";
import SignInModal from "../../No longer using/SignInModal";
import FlexGap from "../UtilClasses/FlexGap";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function Home() {
  type Recipe = {
    _id: string;
    title: string;
    img: string;
    link: string;
    author: string;
  };
  type Review = {
    _id: string;
    title: string;
    stars: number;
    recipe: Recipe;
    author: string;
    link: string;
    text: string;
  };
  const userRecipes: Recipe[] = [
    {
      _id: "1",
      title: "Example Recipe 1",
      img: "/images/test.jpg",
      link: "/",
      author: "Aaron Detre",
    },
    {
      _id: "2",
      title: "Example Recipe 2",
      img: "/images/test.jpg",
      link: "/",
      author: "Aaron Detre",
    },
    {
      _id: "3",
      title: "Example Recipe 3",
      img: "/images/test.jpg",
      link: "/",
      author: "Aaron Detre",
    },
    {
      _id: "4",
      title: "Example Recipe 4",
      img: "/images/test.jpg",
      link: "/",
      author: "Aaron Detre",
    },
    {
      _id: "5",
      title: "Example Recipe 5",
      img: "/images/test.jpg",
      link: "/",
      author: "Aaron Detre",
    },
  ];

  const recentReviews: Review[] = [
    {
      _id: "1",
      recipe: {
        _id: "3",
        title: "Example Recipe 3",
        img: "/images/test.jpg",
        link: "/",
        author: "Aaron Detre",
      },
      title: "Gross",
      author: "Aaron Detre",
      link: "/",
      stars: 0,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet magna vestibulum, congue tellus in, semper felis. Curabitur facilisis hendrerit magna, eu sagittis",
    },
    {
      _id: "2",
      recipe: {
        _id: "1",
        title: "Example Recipe 1",
        img: "/images/test.jpg",
        link: "/",
        author: "Aaron Detre",
      },
      title: "Pretty good recipe",
      author: "Aaron Detre",
      link: "/",
      stars: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet magna vestibulum, congue tellus in, semper felis. Curabitur facilisis hendrerit magna, eu sagittis",
    },
    {
      _id: "3",
      recipe: {
        _id: "5",
        title: "Example Recipe 5",
        img: "/images/test.jpg",
        link: "/",
        author: "Aaron Detre",
      },
      title: "Fine",
      author: "Aaron Detre",
      link: "/",
      stars: 3,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet magna vestibulum, congue tellus in, semper felis. Curabitur facilisis hendrerit magna, eu sagittis",
    },
    {
      _id: "4",
      recipe: {
        _id: "1",
        title: "Example Recipe 1",
        img: "/images/test.jpg",
        link: "/",
        author: "Aaron Detre",
      },
      title: "good recipe",
      author: "Joe",
      link: "/",
      stars: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet magna vestibulum, congue tellus in, semper ",
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
                            href={recipe.link}
                            className="wdf-header"
                          >
                            {recipe.title}
                          </CardTitle>
                          <CardText>By {recipe.author}</CardText>
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
                            href={review.link}
                            className="wdf-header"
                          >
                            {review.recipe.title}
                          </CardTitle>
                          <CardText className="d-flex align-items-center">
                            <span className="me-2">{review.author}</span>
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
