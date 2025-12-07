import Link from "next/link";
import { Button } from "react-bootstrap";

export default function RestrictedSettingsPage() {
  return (
    <div>
      <h1 className="ms-3">Sign in to view or change your settings</h1>
      <div className="d-flex flex-column m-5 align-items-center">
        <Button variant="primary" className="m-2 w-50" href="/login">
          Sign In
        </Button>
        <Button variant="primary" className="m-2 w-50" href="/register">
          Sign Up
        </Button>
      </div>
    </div>
  );
}
