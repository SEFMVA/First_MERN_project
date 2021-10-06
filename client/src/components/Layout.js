import Header from "./Header";
import Sidebar from "./Sidebar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

import UserStatistics from "./UserStatistics";
import FileList from "./FileList";
import AddFile from "./AddFile";

function Layout(params) {
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
                    <UserStatistics />
                  </Route>
                  <Route path="/fileList" exact>
                    <FileList />
                  </Route>
                  <Route path="/addFile" exact>
                    <AddFile />
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

export default Layout;
