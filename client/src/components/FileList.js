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
      // const response = await fetch("http://127.0.0.1:8501/api/files/getFileList");
      // const fileList = await response.json();
      const fileList = {
        0: {
          name: "placeholder",
          size: 0,
          date: "1.1.2021",
        },
        1: {
          name: "placeholder",
          size: 0,
          date: "1.1.2021",
        },
        2: {
          name: "placeholder",
          size: 0,
          date: "1.1.2021",
        },
      };
      setLoadedFileList(
        Object.keys(fileList).map((key) => [Number(key), fileList[key]])
      );
      console.log(loadedFileList);
      setIsLoading(false);
    } catch (error) {
      if (isLoading) setIsLoading(false);
      setErrorMessage(JSON.stringify(error));
    }
  }

  useEffect(() => {
    getUserFiles();
  }, []);

  function createListFromFile(list) {
    return (
      <Container id="fileList">
        {loadedFileList.map(([id, { name, size, date }]) => {
          return <File id={id} name={name} size={size} date={date} />;
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
