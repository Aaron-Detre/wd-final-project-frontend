"use client";
import { ReactNode, useState } from "react";
import "./styles.css";
import { Col, Container, Row } from "react-bootstrap";
import TOC from "./TOC";
import { AiOutlineMenu } from "react-icons/ai";
import TOCOffcanvas from "./TOCOffcanvas";
import { usePathname } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [showOffcanvas, setshowOffcanvas] = useState(false);
  const handleOpenMenu = () => setshowOffcanvas(true);
  const handleCloseMenu = () => setshowOffcanvas(false);
  const getTitle = (pathTokens: string[]): string => {
    const lastPathToken = getLastPathToken(pathTokens);
    return lastPathToken
      ? lastPathToken.charAt(0).toUpperCase() + lastPathToken.slice(1)
      : "";
  };
  const getLastPathToken = (pathTokens: string[]): string | undefined =>
    pathTokens.at(pathTokens.length - 1);

  const pathTokens = usePathname().split("/");
  const title = getTitle(pathTokens);

  return (
    <div className="wdf-full-height">
      <Container className="w-100" fluid>
        <Row className="d-block d-lg-none">
          <Col className="d-flex align-items-center">
            <AiOutlineMenu
              className="wdf-header-menu-icon fs-1 m-3 d-lg-none"
              onClick={handleOpenMenu}
            />
            <span className="wdf-header fs-1">{title}</span>
          </Col>
        </Row>
        <Row className="d-lg-flex">
          <Col className="d-none d-lg-block flex-grow-0">
            <TOC />
          </Col>
          <Col className="wdf-toc-offset flex-grow-1 mt-3">{children}</Col>
        </Row>
      </Container>
      <TOCOffcanvas show={showOffcanvas} handleClose={handleCloseMenu} />
    </div>
  );
}
