"use client";
import { ReactNode, useState } from "react";
import "./styles.css";
import { Col, Container, Row } from "react-bootstrap";
import TOC from "./TOC/TOC";
import { AiOutlineMenu } from "react-icons/ai";
import TOCOffcanvas from "./TOC/TOCOffcanvas";
import { Provider } from "react-redux";
import store from "./store";
import Session from "./(Account)/Session";
import Title from "./Title";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [showOffcanvas, setshowOffcanvas] = useState(false);
  const handleOpenMenu = () => setshowOffcanvas(true);
  const handleCloseMenu = () => setshowOffcanvas(false);

  return (
    <Provider store={store}>
      <Session>
        <div className="wdf-full-height">
          <Container className="w-100" fluid>
            <Row className="d-block d-lg-none">
              <Col className="d-flex align-items-center">
                <AiOutlineMenu
                  className="wdf-header-menu-icon fs-1 m-3 mt-4 d-lg-none"
                  onClick={handleOpenMenu}
                />
                <Title />
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
      </Session>
    </Provider>
  );
}
