"use client";
import {
  Button,
  Card,
  Col,
  FormControl,
  FormLabel,
  Modal,
} from "react-bootstrap";
import { RiAccountCircleLine } from "react-icons/ri";
import { AiOutlineMenu } from "react-icons/ai";
import FlexGap from "./FlexGap";
import "./styles.css";
import { useState } from "react";

export default function Home() {
  const infoPanels: { title: string; img: string; text: string }[] = [
    {
      title: "Info Panel 1",
      img: "/images/test.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel iaculis diam. Vivamus semper magna dapibus neque elementum, ut malesuada diam pulvinar. Donec posuere molestie ex, at dictum nunc pharetra ac. Donec molestie, neque eu laoreet scelerisque, quam tortor scelerisque dui, sed maximus augue felis at nisl. Phasellus lobortis libero at odio tincidunt sagittis. Aenean in consectetur risus. Ut porta eu est vel elementum. Aenean est urna, vestibulum in maximus sit amet, condimentum at mauris. Quisque ultrices tempor finibus. Maecenas ac feugiat leo. Phasellus eu venenatis magna. Vivamus ac commodo justo. Donec eleifend mi in sapien tempus, vitae tincidunt quam gravida. Nunc luctus blandit blandit. Curabitur fermentum ligula velit, nec malesuada massa dictum in.",
    },
    {
      title: "Info Panel 2",
      img: "/images/test.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel iaculis diam. Vivamus semper magna dapibus neque elementum, ut malesuada diam pulvinar. Donec posuere molestie ex, at dictum nunc pharetra ac. Donec molestie, neque eu laoreet scelerisque, quam tortor scelerisque dui, sed maximus augue felis at nisl. Phasellus lobortis libero at odio tincidunt sagittis. Aenean in consectetur risus. Ut porta eu est vel elementum. Aenean est urna, vestibulum in maximus sit amet, condimentum at mauris. Quisque ultrices tempor finibus. Maecenas ac feugiat leo. Phasellus eu venenatis magna. Vivamus ac commodo justo. Donec eleifend mi in sapien tempus, vitae tincidunt quam gravida. Nunc luctus blandit blandit. Curabitur fermentum ligula velit, nec malesuada massa dictum in.",
    },
    {
      title: "Info Panel 3",
      img: "/images/test.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel iaculis diam. Vivamus semper magna dapibus neque elementum, ut malesuada diam pulvinar. Donec posuere molestie ex, at dictum nunc pharetra ac. Donec molestie, neque eu laoreet scelerisque, quam tortor scelerisque dui, sed maximus augue felis at nisl. Phasellus lobortis libero at odio tincidunt sagittis. Aenean in consectetur risus. Ut porta eu est vel elementum. Aenean est urna, vestibulum in maximus sit amet, condimentum at mauris. Quisque ultrices tempor finibus. Maecenas ac feugiat leo. Phasellus eu venenatis magna. Vivamus ac commodo justo. Donec eleifend mi in sapien tempus, vitae tincidunt quam gravida. Nunc luctus blandit blandit. Curabitur fermentum ligula velit, nec malesuada massa dictum in.",
    },
  ];

  const [showSignIn, setShowSignIn] = useState(false);
  const handleOpen = () => setShowSignIn(true);
  const handleClose = () => setShowSignIn(false);

  return (
    <div>
      <div className="wdf-header d-flex">
        <AiOutlineMenu
          className="wdf-header-menu-icon"
          onClick={() => alert("menu")}
        />
        <h1 className="wdf-header-title">Project Sharing/Tracking Site</h1>
        <FlexGap />
        <RiAccountCircleLine
          className="wdf-account-link"
          onClick={handleOpen}
        />
      </div>
      <hr />
      <div className="wdf-info-panels d-md-flex gap-4 ms-4 me-4">
        {infoPanels.map((infoPanel) => (
          <Col md={3.5}>
            <Card className="wdf-info-panel mb-4 shadow p-3 bg-white rounded">
              <Card.Img src={infoPanel.img} />
              <Card.Body>
                <Card.Title>{infoPanel.title}</Card.Title>
                <hr />
                <Card.Text>{infoPanel.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </div>

      <div className="wdf-sign-in-modal">
        <Modal show={showSignIn} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormLabel htmlFor="username-entry">Username</FormLabel>
            <FormControl id="username-entry" type="text" />
            <FormLabel htmlFor="password-entry">Password</FormLabel>
            <FormControl id="username-entry" type="password" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Sign In
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
