import { useState, useEffect } from "react";

import { Button, Form, Container, Col, Row, Card } from "react-bootstrap";

import File from "./File";

function FileList() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedFileList, setLoadedFileList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);

  async function getUserFiles() {
    try {
      if (errorMessage !== false) setErrorMessage(false);
      const response = await fetch(
        "http://127.0.0.1:8501/api/files/getFileList",
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
      // const fileList = {
      //   0: {
      //     name: "placeholder",
      //     size: 0,
      //     date: "1.1.2021",
      //   },
      //   1: {
      //     name: "placeholder",
      //     size: 0,
      //     date: "1.1.2021",
      //   },
      //   2: {
      //     name: "placeholder",
      //     size: 0,
      //     date: "1.1.2021",
      //   },
      // };

      const fileList = jsonResponse.message;

      setLoadedFileList(fileList);

      setIsLoading(false);
    } catch (error) {
      setErrorMessage(JSON.stringify(error));
      if (isLoading) setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserFiles();
  }, []);

  function createListFromFile(list) {
    return (
      <Container id="fileList">
        {loadedFileList.length === 0
          ? "You don't have any files..."
          : loadedFileList.map(({ _id, name, size, date }) => {
              return (
                <File key={_id} id={_id} name={name} size={size} date={date} />
              );
            })}
      </Container>
    );
  }

  if (isLoading) {
    return <div className="filelist">Loading...</div>;
  } else {
    if (errorMessage) return <div className="filelist">{errorMessage}</div>;
    else
      return (
        <div className="filelist">{createListFromFile(loadedFileList)}</div>
      );
  }
}

export default FileList;
