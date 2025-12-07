import { useSelector } from "react-redux";
import { RootState } from "../store";
import * as userClient from "../Clients/userClient";
import { Button } from "react-bootstrap";

export default function AccountButtons({ className }: { className: string }) {
  const { currentUser } = useSelector((state: RootState) => state.account);
  const signOut = () => userClient.signOut();
  return currentUser ? (
    <Button
      onClick={signOut}
      href="/"
      variant="secondary"
      className="mt-2 mb-3"
    >
      Sign Out
    </Button>
  ) : (
    <>
      <Button href="/login" variant="secondary" className="mt-2">
        Sign In
      </Button>
      <Button href="/register" variant="secondary" className="mt-2 mb-3">
        Sign Up
      </Button>
    </>
  );
}
