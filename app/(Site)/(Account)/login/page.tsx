"use client";
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import FlexGap from "../../UtilClasses/FlexGap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { redirect } from "next/navigation";
import * as userClient from "../../Clients/userClient";

export default function SignIn() {
  const [credentials, setCredentials] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });
  const dispatch = useDispatch();
  const signIn = async () => {
    const user = await userClient.signIn(credentials);
    if (user) {
      dispatch(setCurrentUser(user));
      redirect("/"); //TODO: home or profile?
    }
  };
  const usernameChanges = (e: any) => {
    setCredentials({ ...credentials, username: e.target.value });
  };
  const passwordChanges = (e: any) => {
    setCredentials({ ...credentials, password: e.target.value });
  };
  const handleKeyDown = (e: any) => e.key === "Enter" && signIn();

  return (
    <div className="d-flex justify-content-center">
      <Card className="w-25 mt-5">
        <CardHeader>Sign In</CardHeader>
        <CardBody>
          <FormLabel htmlFor="username-entry">Username</FormLabel>
          <FormControl
            id="username-entry"
            type="text"
            className="mb-3"
            onChange={usernameChanges}
            onKeyDown={handleKeyDown}
          />
          <FormLabel htmlFor="password-entry">Password</FormLabel>
          <FormControl
            id="username-entry"
            type="password"
            onChange={passwordChanges}
            onKeyDown={handleKeyDown}
          />
        </CardBody>
        <CardFooter className="d-flex">
          <FlexGap />
          <Link className="btn btn-secondary me-2" href="/">
            Cancel
          </Link>
          <Button variant="primary" onClick={signIn}>
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
