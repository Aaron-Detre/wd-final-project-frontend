import { Button, Card, Nav, NavItem, NavLink } from "react-bootstrap";
import { Path } from "./Header";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignInModal from "./SignInModal";
import { useState } from "react";
import FlexGap from "./FlexGap";

export const paths: Path[] = [
  { link: "/Home", label: "Home" },
  { link: "/Search", label: "Search" },
  { link: "/Recipes", label: "Recipes" },
  { link: "/Profile", label: "Profile" },
  { link: "/Settings", label: "Settings" },
];

export default function TOC() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  return (
    <div className="position-fixed bottom-0 top-0 d-none d-md-block z-2">
      <div className="wdf-flex-column">
        <Nav variant="pills" className="wd-nav-menu ">
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
        <Button onClick={() => setSignedIn(!signedIn)}>Toggle</Button>
        {!signedIn && (
          <>
            <Button onClick={() => setShow(true)} className="mt-2">
              Sign In
            </Button>
            <Button href="/Account/SignUp" className="mt-2 mb-3">
              Sign Up
            </Button>
          </>
        )}
        <SignInModal showSignIn={show} setShowSignIn={setShow} />
      </div>
    </div>
  );
}
