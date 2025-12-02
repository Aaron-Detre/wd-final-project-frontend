"use client";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import FlexGap from "../../UtilClasses/FlexGap";
import { useState } from "react";
import { stringify } from "querystring";

export default function SignUp() {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "BOTH",
  });

  const usernameChanges = (e: any) =>
    setNewUser({ ...newUser, username: e.target.value });
  const passwordChanges = (e: any) =>
    setNewUser({ ...newUser, password: e.target.value });
  const roleChanges = (value: string) =>
    setNewUser({ ...newUser, role: value });

  return (
    <div className="d-flex justify-content-center">
      <Col xl={4} sm={2} xs={1}></Col>
      <Col xl={4} sm={8} xs={10}>
        <Form className="w-100 mt-5">
          <Card>
            <Card.Header>Sign Up</Card.Header>
            <Card.Body>
              <Form.Group controlId="wdf-username-entry" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" onChange={usernameChanges} required />
              </Form.Group>
              <Form.Group controlId="wdf-password-entry" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={passwordChanges}
                  required
                />
              </Form.Group>
              <Form.Group controlId="wdf-role-select">
                <Form.Label>Role (you can change this later)</Form.Label>
                <Form.Check
                  type="radio"
                  name="role-select"
                  id="wdf-recipe-author-radio"
                  label="Recipe Author"
                  onClick={() => roleChanges("AUTHOR")}
                />
                <Form.Check
                  type="radio"
                  name="role-select"
                  id="wdf-recipe-reviewer-radio"
                  label="Recipe Reviewer"
                  onClick={() => roleChanges("REVIEWER")}
                />
                <Form.Check
                  type="radio"
                  name="role-select"
                  id="wdf-both-radio"
                  label="Both"
                  onClick={() => roleChanges("BOTH")}
                  defaultChecked
                />
              </Form.Group>
            </Card.Body>
            <Card.Footer className="d-flex">
              <FlexGap />
              <Button
                className="me-2"
                variant="secondary"
                type="button"
                href="/"
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </Card.Footer>
          </Card>
        </Form>
      </Col>
      <Col xl={4} sm={2} xs={1}></Col>
      {/* <div className="wdf-temp">{stringify(newUser)}</div> */}
    </div>
  );
}
