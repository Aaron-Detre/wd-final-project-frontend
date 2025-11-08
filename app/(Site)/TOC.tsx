"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";

export default function TOC() {
  const pathname = usePathname();
  const paths: { link: string; label: string }[] = [];
  return (
    <Nav>
      {paths.map((path) => (
        <NavItem key={path.label}>
          <NavLink href={path.link} as={Link}>
            {path.label}
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
}
