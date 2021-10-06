import { Button, Form, Container, Col, Row } from "react-bootstrap";

function AddUser(params) {
  async function submitForm(event) {
    event.preventDefault();

    try {
      const form = event.target.form;
      form.nextSibling.innerHTML = "";
      form.nextSibling.nextSibling.innerHTML = "";

      const userName = form[0].value;
      const email = form[1].value;
      const password = form[2].value;
      const isAdmin = form[3].checked;

      console.log(
        `userName: ${userName}, email: ${email}, password: ${password}`
      );

      const response = await fetch(`http://127.0.0.1:8501/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          email: email,
          password: password,
          isAdmin: isAdmin,
        }),
      });
      const jsonResponse = await response.json();

      if (response.status !== 200) throw jsonResponse;

      form.nextSibling.nextSibling.innerHTML = "Success";
    } catch (error) {
      event.target.form.nextSibling.innerHTML = JSON.stringify(error);
    }
  }

  return (
    <Container centered>
      <h3>Add User</h3>
      <Form>
        <Form.Group className="mb-3" controlId="formEmail">
          <Row className="justify-content-md-center">
            <Col sm="2">
              <Form.Label>Name:</Form.Label>
            </Col>
            <Col sm="2">
              <Form.Control
                type="email"
                name="username"
                placeholder=""
                required=""
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Row className="justify-content-md-center">
            <Col sm="2">
              <Form.Label>Email:</Form.Label>
            </Col>
            <Col sm="2">
              <Form.Control type="email" placeholder="" required="" />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Row className="justify-content-md-center">
            <Col sm="2">
              <Form.Label>Password:</Form.Label>
            </Col>
            <Col sm="2">
              <Form.Control type="password" placeholder="" required="" />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="isAdmin">
          <Row className="justify-content-md-center">
            <Col sm="2">
              <Form.Label>Set as admin:</Form.Label>
            </Col>
            <Col sm="2">
              <Form.Check type="checkbox" />
            </Col>
          </Row>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={submitForm}>
          Add user
        </Button>
      </Form>
      <div className="errorLogger"></div>
      <div className="successMessage"></div>
    </Container>
  );
}

export default AddUser;
