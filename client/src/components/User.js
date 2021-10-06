import { Button, Row } from "react-bootstrap";

import { useState } from "react";

function User(props) {
  const [name, setName] = useState(props.name);
  const [email, setEmail] = useState(props.email);
  const [isAdmin, setIsAdmin] = useState(props.isAdmin);
  const [maxSpace, setMaxSpace] = useState(props.maxSpace);

  async function modifyProperty(event) {
    try {
      event.preventDefault();

      const modyfingProperty =
        event.target.attributes.getNamedItem("modyfingproperty").nodeValue;

      let value = prompt(`Modify property ${modyfingProperty}`);
      if (value != null) {
        if (value === "True") {
          value = true;
        }
        if (value === "False") {
          value = false;
        }
        const response = await fetch(
          `http://127.0.0.1:8501/api/admin/modifyUser`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              modyfiedUserId: props.id,
              modyfiedProperty: modyfingProperty,
              modyfiedPropertyValue: value,
              token: localStorage.getItem("authToken"),
            }),
          }
        );
        if (response.status !== 200) {
          alert("Modyfing user failed");
          return;
        }
        const setters = {
          name: setName,
          email: setEmail,
          isAdmin: setIsAdmin,
          maxSpace: setMaxSpace,
        };
        setters[modyfingProperty](value);
      }
    } catch (error) {
      alert(error.toString());
    }
  }

  async function deleteUser(event) {
    try {
      event.preventDefault();
      const value = window.confirm(`Delete user ${props.name}?`);
      if (value != null) {
        const response = await fetch(
          `http://127.0.0.1:8501/api/admin/deleteUser`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              deleteUserId: props.id,
              token: localStorage.getItem("authToken"),
            }),
          }
        );
        if (response.status !== 200) alert("Delete user fail...");
      }
    } catch (error) {
      alert(error.toString());
    }
  }

  return (
    <Row>
      <div className="user">
        Name: {name} | e-mail: {email} | isAdmin: {isAdmin ? "True" : "False"}|
        maxSpace: {maxSpace}
        <br />
        <Button
          variant="primary"
          modyfingProperty="name"
          className="text-uppercase fw-bold"
          onClick={modifyProperty}
        >
          Change name
        </Button>
        <Button
          variant="secondary"
          modyfingProperty="email"
          className=" text-uppercase fw-bold"
          onClick={modifyProperty}
        >
          Change e-mail
        </Button>
        <Button
          variant="success"
          modyfingProperty="isAdmin"
          className=" text-uppercase fw-bold"
          onClick={modifyProperty}
        >
          Change admin privilages
        </Button>
        <Button
          variant="warning"
          modyfingProperty="maxSpace"
          className=" text-uppercase fw-bold"
          onClick={modifyProperty}
        >
          Change maximum space
        </Button>
        <Button
          variant="danger"
          className=" text-uppercase fw-bold"
          onClick={deleteUser}
        >
          Delete user
        </Button>
      </div>
    </Row>
  );
}

export default User;
