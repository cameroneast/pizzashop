import React, { useEffect, useCallback, useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

export const SignUpModal = (props) => {
  const [username, setUsername] = useState("");
  const [usernameValid, setUsernameValid] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [validated, setValidated] = useState(false);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleValidateUsername = async (username) => {
    try {
      const response = await axios.get(
        `https://localhost:7285/api/account/validate-username?username=${username}`
      );
      setUsernameValid(!response.data.exists);
    } catch (error) {
      console.error("There was an error validating the username!", error);
    }
  };

  const handleValidatePassword = async (password) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!passwordRegex.test(password)) {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
    }
  };

  const debouncedValidateUsername = useCallback(
    debounce(handleValidateUsername, 500),
    []
  );

  const debouncedValidatePassword = useCallback(
    debounce(handleValidatePassword, 500),
    []
  );

  useEffect(() => {
    if (username) {
      debouncedValidateUsername(username);
    }
  }, [username]);

  useEffect(() => {
    if (password) {
      debouncedValidatePassword(password);
    }
  }, [password]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (
      form.checkValidity() === false ||
      usernameValid === false ||
      passwordValid === false
    ) {
      e.stopPropagation();
      setValidated(false);
      return;
    }
    setValidated(true);
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
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          🍕 Create an account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSignUp}>
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.FloatingLabel label="Username">
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                isInvalid={usernameValid === false}
                isValid={usernameValid === true}
                required
                onBlur={() => {
                  if (!username) {
                    setUsernameValid(null);
                    setValidated(false);
                  }
                }}
              />
              <Form.Control.Feedback type="valid">
                Username not taken.
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Username already taken.
              </Form.Control.Feedback>
            </Form.FloatingLabel>
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.FloatingLabel label="Password">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-describedby="passwordHelpBlock"
                isInvalid={passwordValid === false}
                isValid={passwordValid === true}
                required
                onBlur={() => {
                  if (!password) {
                    setPasswordValid(null);
                    setValidated(false);
                  }
                }}
              />
              <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain letters and
                numbers, at least 1 special character, and no spaces.
              </Form.Text>
              <Form.Control.Feedback type="valid">
                Password is strong.
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Weak password.
              </Form.Control.Feedback>
            </Form.FloatingLabel>
          </Form.Group>
          <Form.Group controlId="formShowPassword" className="mt-2">
            <Form.Check
              type="checkbox"
              label="Show password"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
          </Form.Group>
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit" className="mt-3">
              Sign Up
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
