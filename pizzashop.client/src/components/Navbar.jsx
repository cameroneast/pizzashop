import React, { useState } from "react";
import { Button, Container, Form, Navbar, Nav } from "react-bootstrap";
import { SignUpModal } from "./SignUpModal";

export const PizzaShopNavbar = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <span role="img" aria-label="pizza">
            🍕
          </span>
          PizzaShop
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#menu">Menu</Nav.Link>
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Form className="d-flex">
            <Button variant="outline-secondary">Sign In</Button>
            <Button
              variant="primary"
              className="ms-2"
              onClick={() => setShowSignUp(true)}
            >
              Sign Up
            </Button>
            <SignUpModal
              show={showSignUp}
              onHide={() => setShowSignUp(false)}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
