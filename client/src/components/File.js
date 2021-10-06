import { Button, Form, Container, Col, Row, Card } from "react-bootstrap";

import { saveAs } from "file-saver";

function File(props) {
  async function decrypt(event) {
    event.preventDefault();
    const key = prompt(`Input key for ${props.name}`);
    if (key != null) {
      const iv = prompt(`Input IV for ${props.name}`);
      if (iv != null) {
        // const enc = new TextEncoder();
        // const decodedIV = enc.encode(iv);
        const decodedIV = Uint8Array.from(iv.split(","));
        const importedKey = await crypto.subtle.importKey(
          "jwk",
          JSON.parse(key),
          { name: "AES-CBC", length: 256 },
          false,
          ["encrypt", "decrypt"]
        );

        const response = await fetch(
          `http://127.0.0.1:8501/api/files/getFile`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fileID: props.id,
              token: localStorage.getItem("authToken"),
            }),
          }
        );

        const blob = await response.blob();
        // const fileReader = new FileReader();
        // fileReader.readAsArrayBuffer(blob);

        const ciphertext = await blob.arrayBuffer();

        console.log(decodedIV);
        const plaintext = await crypto.subtle.decrypt(
          {
            name: "AES-CBC",
            iv: decodedIV,
          },
          importedKey,
          ciphertext
        );
        saveAs(new Blob([plaintext]), `${props.name}`);
      }
    }
  }

  function deleteFile(event) {
    event.preventDefault();
    const deleteConfirm = window.confirm(
      `Are you sure to delete ${props.name}?`
    );
    if (deleteConfirm) {
      fetch(`http://127.0.0.1:8501/api/files/deleteFile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileID: props.id,
          token: localStorage.getItem("authToken"),
        }),
      });
    }
  }

  return (
    <Row>
      <div className="file">
        {props.name} /{props.size} /{props.date}
        <Button
          variant="success"
          className="btn-login text-uppercase fw-bold"
          onClick={decrypt}
        >
          Decrypt
        </Button>
        <Button
          variant="danger"
          className="btn-login text-uppercase fw-bold"
          onClick={deleteFile}
        >
          Delete
        </Button>
      </div>
    </Row>
  );
}

export default File;
