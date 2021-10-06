import React from "react";
import { Nav } from "react-bootstrap";

import { Link } from "react-router-dom";

import { useContext } from "react";
import AdminContext from "../contexts/AdminContext";

const Sidebar = (props) => {
  const adminCtx = useContext(AdminContext);
  const isAdmin = adminCtx.getIsAdmin();

  return (
    <div>
      {isAdmin ? (
        <Nav className="d-md-block bg-light sidebar">
          <div className="sidebar-sticky"></div>
          <Nav.Item>
            <Link to="/">Home</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/userList">List users</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/addUser">Add user</Link>
          </Nav.Item>
        </Nav>
      ) : (
        <Nav className="d-md-block bg-light sidebar">
          <div className="sidebar-sticky"></div>
          <Nav.Item>
            <Link to="/">Home</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/fileList">List files</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/addFile">Add files</Link>
          </Nav.Item>
        </Nav>
      )}
    </div>
  );
};
export default Sidebar;
