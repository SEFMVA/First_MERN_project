import Header from "./Header";
import Sidebar from "./Sidebar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

import Statistics from "./Statistics";
import UserList from "./UserList";
import AddUser from "./AddUser";

function AdminPanel(params) {
  return (
    <BrowserRouter>
      <div id="adminPanel">
        <Header></Header>
        <main>
          <Container>
            <Row>
              <Col md="2">
                <Sidebar></Sidebar>
              </Col>
              <Col>
                <Switch>
                  <Route path="/" exact>
                    <Statistics />
                  </Route>
                  <Route path="/userList" exact>
                    <UserList />
                  </Route>
                  <Route path="/addUser" exact>
                    <AddUser />
                  </Route>
                </Switch>
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default AdminPanel;
