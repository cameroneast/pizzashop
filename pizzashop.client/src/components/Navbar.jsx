import React, { useState } from "react";
import { Button, Container, Form, Navbar, Nav, Modal } from "react-bootstrap";
import axios from "axios";

function SignUpModal(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7285/api/account/signup",
        {
          username,
          password,
        }
      );
      console.log(response.data);
      props.onHide();
    } catch (error) {
      console.error("There was an error creating the account!", error);
    }
  };

  return (
    <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          🍕 Create an account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSignUp}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit" className="mt-3">
              Sign Up
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export const PizzaShopNavbar = () => {
  const [show, setShow] = useState(false);

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
              onClick={() => setShow(true)}
            >
              Sign Up
            </Button>
            <SignUpModal show={show} onHide={() => setShow(false)} />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
