import { useState } from "react";
// import config from "../../config.js"; mozna tez dac nazwe uslugi dockera

import { useContext } from "react";
import AdminContext from "../contexts/AdminContext";
import LoggedContext from "../contexts/LoggedContext";

import { Button, Form, Container, Col, Row, Card } from "react-bootstrap";

function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const adminCtx = useContext(AdminContext);
  const loggedCtx = useContext(LoggedContext);

  async function submitForm(event) {
    event.preventDefault();

    if (isLoading === false) {
      setIsLoading(true);
      try {
        const form = event.target.form;
        form.nextSibling.innerHTML = "";

        const userName = form[0].value;
        const password = form[1].value;
        const remember = form[2].checked;

        const response = await fetch(`http://127.0.0.1:8501/api/auth/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userName,
            password: password,
          }),
        });

        const jsonResponse = await response.json();

        if (response.status !== 200) throw jsonResponse;

        loggedCtx.setToken(jsonResponse.token);
        if (jsonResponse.message.isAdmin) {
          adminCtx.setAsAdmin(true);
        } else {
          adminCtx.setAsAdmin(false);
        }
        setIsLoading(false);
      } catch (error) {
        event.target.form.nextSibling.innerHTML = JSON.stringify(error);
        setIsLoading(false);
      }
    }
  }

  return (
    <Container className="verticalCenter">
      <Row>
        <Col className="sm-9 md-7 lg-5 mx-auto">
          <Card className="border-0 shadow rounded-3 my-5">
            <Card.Body className="p-4 p-sm-5">
              <h5 class="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
              <Form>
                <Form.Group
                  className="form-floating mb-3"
                  controlId="formEmail"
                >
                  <Form.Label>Login/E-mail:</Form.Label>

                  <Form.Control
                    type="email"
                    name="username"
                    placeholder="Your username/e-mail"
                    required=""
                    className="form-control"
                  />
                </Form.Group>

                <Form.Group
                  className="form-floating mb-3"
                  controlId="formPassword"
                >
                  <Form.Label>Password:</Form.Label>

                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required=""
                    className="form-control"
                  />
                </Form.Group>

                <Form.Group className="form-check mb-3" controlId="remember">
                  <Form.Label>Remember me:</Form.Label>

                  <Form.Check type="checkbox" />
                </Form.Group>
                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="submit"
                    className="btn-login text-uppercase fw-bold"
                    onClick={submitForm}
                  >
                    Sign in
                  </Button>
                </div>
              </Form>
              <div className="errorLogger"></div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;

/**
 * return (
    <Container className="verticalCenter">
      <h3>Login</h3>
      <Form>
        <Form.Group className="mb-3" controlId="formEmail">
          <Row className="justify-content-md-center">
            <Col sm="2">
              <Form.Label>Login/E-mail:</Form.Label>
            </Col>
            <Col sm="2">
              <Form.Control
                type="email"
                name="username"
                placeholder="Your username/e-mail"
                required=""
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Row className="justify-content-md-center">
            <Col sm="2">
              <Form.Label>Password:</Form.Label>
            </Col>
            <Col sm="2">
              <Form.Control
                type="password"
                placeholder="Password"
                required=""
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="remember">
          <Row className="justify-content-md-center">
            <Col sm="2">
              <Form.Label>Remember me:</Form.Label>
            </Col>
            <Col sm="2">
              <Form.Check type="checkbox" />
            </Col>
          </Row>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={submitForm}>
          Login
        </Button>
      </Form>
      <div id="formError" className="errorLogger"></div>
    </Container>
  );
 * 
 */
