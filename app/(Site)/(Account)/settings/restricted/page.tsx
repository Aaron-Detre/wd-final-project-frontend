import { setTitle } from "@/app/(Site)/reducer";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

export default function RestrictedSettingsPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTitle("Settings"));
  }, [dispatch]);

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
