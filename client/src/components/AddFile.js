import { saveAs } from "file-saver";
//todo api istass saveas

import { Button, Form, Container, Col, Row, Card } from "react-bootstrap";

function AddFile(params) {
  function preProcessFile(event) {
    event.preventDefault();
    const form = event.target.form;
    console.log(form);

    const files = form[0].files;
    const isMultiplePasswords = true;
    let iv;
    console.log(files);
    if (!isMultiplePasswords) {
      iv = crypto.getRandomValues(new Uint8Array(16));
    }

    for (const file of files) {
      if (isMultiplePasswords) {
        iv = crypto.getRandomValues(new Uint8Array(16));
      }

      processFile(file, iv);
    }
  }

  function processFile(file, iv) {
    const reader = new FileReader();
    console.log(iv);
    reader.onload = async function (e) {
      try {
        const data = e.target.result;

        const key = await crypto.subtle.generateKey(
          { name: "AES-CBC", length: 256 },
          true,
          ["encrypt", "decrypt"]
        );
        const exportedKey = await crypto.subtle.exportKey("jwk", key);
        const blob = new Blob([JSON.stringify(exportedKey, null, " ")], {
          type: "text/plain",
        });
        saveAs(blob, `${file.name}.key`);
        // const enc = new TextDecoder("utf-8");
        // saveAs(
        //   new Blob([enc.decode(iv)], {
        //     type: "text/plain",
        //   }),
        //   `${file.name}.keyIV`
        // );
        saveAs(
          new Blob([iv.toString()], {
            type: "text/plain",
          }),
          `${file.name}.keyIV`
        );
        const encrypted = await crypto.subtle.encrypt(
          { name: "AES-CBC", iv },
          key,
          data
        );
        console.log(encrypted);
        const fetchData = new FormData();

        fetchData.append("token", localStorage.getItem("authToken"));
        fetchData.append("size", encrypted.byteLength);
        fetchData.append("name", file.name);
        fetchData.append("file", new Blob([encrypted]));

        return fetch(`http://127.0.0.1:8501/api/files/addFile`, {
          method: "PUT",
          // headers: { "Content-Type": "multipart/form-data" },
          body: fetchData,
        });
        // alert("The encrypted data is " + encrypted.byteLength + " bytes long");
      } catch (error) {
        console.error(error);
      }
    };

    reader.readAsArrayBuffer(file);
  }

  return (
    <Container className="verticalCenter">
      <Row>
        <Col className="sm-9 md-7 lg-5 mx-auto">
          <Card className="border-0 shadow rounded-3 my-5">
            <Card.Body className="p-4 p-sm-5">
              <h5 class="card-title text-center mb-5 fw-light fs-5">
                Add file:
              </h5>
              <Form>
                {/* <Form.Group className="form-check mb-3" controlId="multiPassword">
                  <Form.Label>Use separate password for each file:</Form.Label>

                  <Form.Check type="checkbox" />
                </Form.Group> */}

                <Form.Group
                  className="form-floating mb-3"
                  controlId="formInputFiles"
                >
                  <Form.Label>File(s):</Form.Label>

                  <Form.Control type="file" name="files" required="" multiple />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="submit"
                    className="btn-login text-uppercase fw-bold"
                    onClick={preProcessFile}
                  >
                    Add file
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

export default AddFile;
