"use client";
import { RiAccountCircleLine } from "react-icons/ri";
import { AiOutlineMenu } from "react-icons/ai";
import FlexGap from "./FlexGap";
import { useState } from "react";
import "./styles.css";
import TOCOffcanvas from "./TOCOffcanvas";
import { MdOutlineSettings } from "react-icons/md";
import Link from "next/link";
import { Button } from "react-bootstrap";

export type Path = { link: string; label: string };

export default function Header({
  title,
  setShowSignIn,
}: {
  title: string;
  setShowSignIn?: any;
}) {
  const [signedIn, setSignedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const handleOpenMenu = () => setShowMenu(true);
  const handleCloseMenu = () => setShowMenu(false);
  const handleOpenSignIn = () => setShowSignIn(true);

  return (
    <div>
      <div className="wdf-header d-flex align-items-center mb-3">
        <Button onClick={() => setSignedIn(!signedIn)}>Toggle</Button>
        <AiOutlineMenu
          className="wdf-header-menu-icon fs-1 m-3 d-lg-none"
          onClick={handleOpenMenu}
        />
        <h1 className="wdf-header-title">{title}</h1>
        <FlexGap />
        {signedIn ? (
          <>
            <Link href="/settings">
              <MdOutlineSettings className="fs-1 m-3 me-2 text-black" />
            </Link>
            <Link href="/profile">
              <RiAccountCircleLine className="fs-1 m-3 text-black" />
            </Link>
          </>
        ) : (
          <RiAccountCircleLine
            className="fs-1 m-3"
            onClick={handleOpenSignIn}
          />
        )}
      </div>
      <TOCOffcanvas show={showMenu} handleClose={handleCloseMenu} />
    </div>
  );
}
