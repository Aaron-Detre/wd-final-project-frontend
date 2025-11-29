import Link from "next/link";
import { Button, FormControl, FormLabel, Modal } from "react-bootstrap";

export default function SignInModal({
  showSignIn,
  setShowSignIn,
}: {
  showSignIn: boolean;
  setShowSignIn: any;
}) {
  const handleClose = () => setShowSignIn(false);
  return (
    <div className="wdf-sign-in-modal">
      <Modal show={showSignIn} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormLabel htmlFor="username-entry">Username</FormLabel>
          <FormControl id="username-entry" type="text" className="mb-3" />
          <FormLabel htmlFor="password-entry">Password</FormLabel>
          <FormControl id="username-entry" type="password" className="mb-2" />
          <Link href="/Account/SignUp">create account</Link>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
