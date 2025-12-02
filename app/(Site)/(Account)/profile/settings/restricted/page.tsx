import Link from "next/link";
import { Button } from "react-bootstrap";

export default function RestrictedSettingsPage() {
  return (
    <div>
      <h1>Sign In to view or change your settings</h1>
      <Button href="/login">Sign In</Button>
      <Button href="/register">Sign Up</Button>
      <Button href="/">Home Page</Button>
    </div>
  );
}
