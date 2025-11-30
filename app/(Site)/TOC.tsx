import { Button, Nav, NavItem, NavLink } from "react-bootstrap";
import { Path } from "./Header";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import FlexGap from "./FlexGap";

export const paths: Path[] = [
  { link: "/home", label: "Home" },
  { link: "/search", label: "Search" },
  { link: "/recipes", label: "Recipes" },
  { link: "/profile", label: "Profile" },
  { link: "/settings", label: "Settings" },
];

export default function TOC() {
  const pathname = usePathname();
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
        {signedIn ? (
          <Button href="/" variant="secondary" className="mt-2 mb-3">
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
        )}
      </div>
    </div>
  );
}
