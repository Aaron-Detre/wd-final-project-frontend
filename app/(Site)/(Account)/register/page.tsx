/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import FlexGap from "../../UtilClasses/FlexGap";
import { useEffect, useState } from "react";
import * as userClient from "../../Clients/userClient";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setTitle } from "../../reducer";

export default function SignUp() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle("Sign Up"));
  }, [dispatch]);

  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.account);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    role: "BOTH",
  });

  const usernameChanges = (e: any) =>
    setNewUser({ ...newUser, username: e.target.value });
  const passwordChanges = (e: any) =>
    setNewUser({ ...newUser, password: e.target.value });
  const emailChanges = (e: any) =>
    setNewUser({ ...newUser, email: e.target.value });
  const phoneNumberChanges = (e: any) =>
    setNewUser({ ...newUser, phone: e.target.value });
  const roleChanges = (value: string) =>
    setNewUser({ ...newUser, role: value });

  const signUp = () => userClient.signUp(newUser);

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser]);

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
              <Form.Group controlId="wdf-email-entry" className="mb-3">
                <Form.Label>Email (Optional)</Form.Label>
                <Form.Control type="text" onChange={emailChanges} />
              </Form.Group>
              <Form.Group controlId="wdf-phone-entry" className="mb-3">
                <Form.Label>Phone Number (Optional)</Form.Label>
                <Form.Control type="text" onChange={phoneNumberChanges} />
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
              <Button variant="primary" type="submit" onClick={signUp}>
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
