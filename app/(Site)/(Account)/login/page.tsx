import Link from "next/link";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import FlexGap from "../../UtilClasses/FlexGap";

export default function SignIn() {
  return (
    <div className="d-flex justify-content-center">
      <Card className="w-25 mt-5">
        <CardHeader>Sign In</CardHeader>
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
          <Link className="btn btn-primary" href="/profile">
            Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
