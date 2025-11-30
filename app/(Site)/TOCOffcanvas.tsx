"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Nav, NavItem, NavLink, Offcanvas } from "react-bootstrap";
import { Path } from "./Header";
import { paths } from "./TOC";
import FlexGap from "./FlexGap";
import { useState } from "react";
import SignInModal from "../No longer using/SignInModal";

export default function TOCOffcanvas({
  show,
  handleClose,
}: {
  show: boolean;
  handleClose: any;
}) {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  return (
    <Offcanvas show={show} onHide={handleClose} className="wdf-offcanvas-menu">
      <Offcanvas.Header closeButton>
        <Link href="/" className="text-decoration-none text-black">
          <h3>Recipe Site</h3>
        </Link>
      </Offcanvas.Header>
      <Offcanvas.Body className="wdf-flex-column">
        <Nav variant="pills" className="wd-nav-menu">
          {paths.map((path: Path) => (
            <NavItem key={path.label}>
              <NavLink
                className={`bg-white text-center fs-2 ${
                  pathname.includes(path.label) ? "text-danger" : "text-black"
                }`}
                as={Link}
                href={path.link}
              >
                {path.label}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <FlexGap />
        <Button
          onClick={() => setSignedIn(!signedIn)}
          className="wdf-offcanvas-button"
        >
          Toggle
        </Button>
        {signedIn ? (
          <Button href="/" variant="secondary" className="mt-2 mb-3">
            Sign Out
          </Button>
        ) : (
          <>
            <Button
              href="/login"
              variant="secondary"
              className="mt-2 wdf-offcanvas-button"
            >
              Sign In
            </Button>
            <Button
              href="/register"
              variant="secondary"
              className="mt-2 mb-3 wdf-offcanvas-button"
            >
              Sign Up
            </Button>
          </>
        )}
      </Offcanvas.Body>
      <SignInModal showSignIn={showModal} setShowSignIn={setShowModal} />
    </Offcanvas>
  );
}
