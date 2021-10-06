// import LogoutImage from "./../images/logout.png";

import { Navbar, Nav, Container } from "react-bootstrap";
import LoggedContext from "../contexts/LoggedContext";
import { useContext } from "react";

function Header(params) {
  const loggedCtx = useContext(LoggedContext);
  function logout() {
    loggedCtx.logout();
  }

  function settingsClicked() {
    alert("TODO");
  }

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>SemiNAS</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={settingsClicked}>Settings</Nav.Link>
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
