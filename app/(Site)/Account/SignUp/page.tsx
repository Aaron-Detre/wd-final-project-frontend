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
import FlexGap from "../../FlexGap";

export default function SignUp() {
  return (
    <div className="d-flex justify-content-center">
      <Card className="w-25 mt-5">
        <CardHeader>Sign Up</CardHeader>
        <CardBody>
          <FormLabel htmlFor="username-entry">Username</FormLabel>
          <FormControl id="username-entry" type="text" className="mb-3" />
          <FormLabel htmlFor="password-entry">Password</FormLabel>
          <FormControl id="username-entry" type="password" />
        </CardBody>
        <CardFooter className="d-flex">
          <FlexGap />
          <Link className="btn btn-secondary me-2" href="/">
            Cancel
          </Link>
          <Link className="btn btn-primary" href="/Account/Profile">
            Sign Up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
