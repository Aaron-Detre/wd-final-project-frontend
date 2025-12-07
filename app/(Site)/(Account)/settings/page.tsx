"use client";
import { AppDispatch, RootState } from "@/app/(Site)/store";
import FlexGap from "@/app/(Site)/UtilClasses/FlexGap";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../reducer";
import { redirect } from "next/navigation";
import * as userClient from "../../Clients/userClient";

//TODO: duplication -- copied from sign up page
//TODO: make sure SAVE doesn't save empty username/password

export default function Settings() {
  const [updatedUser, setUpdatedUser] = useState<any>(null);
  const [role, setRole] = useState("");
  const { currentUser } = useSelector((state: RootState) => state.account);

  const fetchProfile = () => {
    if (currentUser) {
      setUpdatedUser(currentUser);
      setRole(currentUser.role);
    } else {
      redirect("/settings/restricted");
    }
  };
  useEffect(() => {
    fetchProfile();
  }, [currentUser]);

  const usernameChanges = (e: any) =>
    setUpdatedUser({ ...updatedUser, username: e.target.value });
  const passwordChanges = (e: any) =>
    setUpdatedUser({ ...updatedUser, password: e.target.value });
  const emailChanges = (e: any) =>
    setUpdatedUser({ ...updatedUser, email: e.target.value });
  const phoneNumberChanges = (e: any) =>
    setUpdatedUser({ ...updatedUser, phone: e.target.value });
  const roleChanges = (value: string) =>
    setUpdatedUser({ ...updatedUser, role: value });

  const dispatch: AppDispatch = useDispatch();
  const onSave = () => {
    userClient.updateUser(updatedUser._id, updatedUser);
    dispatch(setCurrentUser(updatedUser));
  };

  console.log("Role: " + updatedUser?.role + " | " + role);

  return (
    <div>
      <h1>
        <Link href={"/profile"} className="wdf-breadcrumb-link">
          Profile
        </Link>{" "}
        {">"} Settings
      </h1>
      <div className="d-flex justify-content-center">
        <Col xl={4} sm={2} xs={1}></Col>
        <Col xl={4} sm={8} xs={10}>
          <Form className="w-100 mt-5">
            <Card>
              <Card.Header>Change Account Details</Card.Header>
              <Card.Body>
                <Form.Group controlId="wdf-username-entry" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={usernameChanges}
                    defaultValue={updatedUser?.username}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="wdf-password-entry" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={passwordChanges}
                    defaultValue={updatedUser?.password}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="wdf-email-entry" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={emailChanges}
                    defaultValue={updatedUser?.email}
                  />
                </Form.Group>
                <Form.Group controlId="wdf-phone-entry" className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={phoneNumberChanges}
                    defaultValue={updatedUser?.phone}
                  />
                </Form.Group>

                <Form.Group controlId="wdf-role-select">
                  <Form.Label>Role</Form.Label>
                  <Form.Check
                    type="radio"
                    name="role-select"
                    id="wdf-recipe-author-radio"
                    label="Recipe Author"
                    onClick={() => roleChanges("AUTHOR")}
                    defaultChecked={role === "AUTHOR"}
                  />
                  <Form.Check
                    type="radio"
                    name="role-select"
                    id="wdf-recipe-reviewer-radio"
                    label="Recipe Reviewer"
                    onClick={() => roleChanges("REVIEWER")}
                    defaultChecked={role === "REVIEWER"}
                  />
                  <Form.Check
                    type="radio"
                    name="role-select"
                    id="wdf-both-radio"
                    label="Both"
                    onClick={() => roleChanges("BOTH")}
                    defaultChecked={role === "BOTH"}
                  />
                </Form.Group>
              </Card.Body>
              <Card.Footer className="d-flex">
                <FlexGap />
                <Button
                  className="me-2"
                  variant="secondary"
                  type="button"
                  href="/profile"
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit" onClick={onSave}>
                  Save
                </Button>
              </Card.Footer>
            </Card>
          </Form>
        </Col>
        <Col xl={4} sm={2} xs={1}></Col>
      </div>
    </div>
  );
}
