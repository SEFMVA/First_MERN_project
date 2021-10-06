import { useState, useEffect } from "react";

import { Button, Form, Container, Col, Row, Card } from "react-bootstrap";

import User from "./User";

function UserList() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedUserList, setLoadedUserList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);

  async function getUserList() {
    try {
      if (errorMessage !== false) setErrorMessage(false);
      const response = await fetch(
        "http://127.0.0.1:8501/api/admin/getUserList",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: localStorage.getItem("authToken"),
          }),
        }
      );
      const jsonResponse = await response.json();

      if (response.status !== 200) throw jsonResponse;

      const usersList = jsonResponse.users;

      setLoadedUserList(usersList);

      setIsLoading(false);
    } catch (error) {
      setErrorMessage(JSON.stringify(error));
      if (isLoading) setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserList();
  }, []);

  function createListFromUsers(list) {
    return (
      <Container id="userList">
        {loadedUserList.length === 0
          ? "No users? So who are you!?"
          : loadedUserList.map(({ _id, name, email, isAdmin, maxSpace }) => {
              return (
                <User
                  key={_id}
                  id={_id}
                  name={name}
                  email={email}
                  isAdmin={isAdmin}
                  maxSpace={maxSpace}
                />
              );
            })}
      </Container>
    );
  }

  if (isLoading) {
    return <div className="usersList">Loading...</div>;
  } else {
    if (errorMessage) return <div className="usersList">{errorMessage}</div>;
    else
      return (
        <div className="usersList">{createListFromUsers(loadedUserList)}</div>
      );
  }
}

export default UserList;
