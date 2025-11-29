"use client";
import { ReactNode, useState } from "react";
import "./styles.css";
import { Col, Container, Row } from "react-bootstrap";
import TOC from "./TOC";
import SignInModal from "./SignInModal";
import { AiOutlineMenu } from "react-icons/ai";
import TOCOffcanvas from "./TOCOffcanvas";
import { usePathname } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showOffcanvas, setshowOffcanvas] = useState(false);
  const handleOpenMenu = () => setshowOffcanvas(true);
  const handleCloseMenu = () => setshowOffcanvas(false);
  const pathTokens = usePathname().split("/");
  const getLastPathToken = () => pathTokens.at(pathTokens.length - 1);
  return (
    <div className="border">
      <Container className="w-100" fluid>
        <Row className="d-block d-lg-none">
          <Col className="d-flex align-items-center">
            <AiOutlineMenu
              className="wdf-header-menu-icon fs-1 m-3 d-lg-none"
              onClick={handleOpenMenu}
            />
            <span className="wdf-header fs-1">{getLastPathToken()}</span>
          </Col>
        </Row>
        <Row className="d-lg-flex">
          <Col className="d-none d-lg-block flex-grow-0">
            <TOC />
          </Col>
          <Col className="wdf-toc-offset flex-grow-1 mt-3">{children}</Col>
        </Row>
      </Container>
      <SignInModal showSignIn={showSignIn} setShowSignIn={setShowSignIn} />
      <TOCOffcanvas show={showOffcanvas} handleClose={handleCloseMenu} />
    </div>
  );
}
