import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import moment from "moment";
import axios from 'axios'

function App() {
  const fileInput = useRef(null);
  const fileInputEdit = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [editFile, setEditFile] = useState({});
  const [state, setState] = useState({
    uploadFiles: []
  });
  const { uploadFiles } = state;
  let defUrl = "http://localhost:8000/api/files"

  const handleClick = (event) => {
    fileInput.current.click();
  };

  const handleClickEdit = (e) => {
    fileInputEdit.current.click();
  };

  const getFiles = () => {
    axios.get(defUrl + "/getFiles").then(({ data }) => {
      if (data.status) {
        setState({ uploadFiles: data.files })
      }
    })
  }

  useEffect(() => {
    getFiles()
  }, [])

  const handleChangeEdit = async (event) => {
    const fileUploaded = event.target.files[0];

    if (fileUploaded) {

      let fd = new FormData()

      fd.append('media', fileUploaded)

      let { data } = await axios.put(defUrl + `/editFile/${editFile._id}`, fd)

      if (data.status) setShowModal(false); getFiles();

    }
  };

  const handleChange = async (event) => {
    const fileUploaded = event.target.files[0];

    if (fileUploaded) {
      let fd = new FormData()

      fd.append('media', fileUploaded)

      let { data } = await axios.post(defUrl + "/fileUpload", fd)

      data.status && getFiles()
    }
  };

  const handleDelete = async (id, i) => {
    await axios.delete(defUrl + `/deleteFile/${id}`).then(({ data }) => {
      if (data.status) uploadFiles.splice(i, 1); setState({ uploadFiles: uploadFiles })
    })
  };

  const handleEdit = (file) => {
    setEditFile(file)
    setShowModal(!showModal);
  };
  return (
    <div className="App">
      <div className="file-upload">
        <button className="upload-btn" onClick={handleClick}>
          Upload File
        </button>
        <input
          type="file"
          ref={fileInput}
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </div>
      <div>
        <Container>
          <div class="table-responsive mt-4">
            <table class="table border ">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>File Name</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {uploadFiles.length > 0 && uploadFiles.map((file, i) =>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{file.file || "--"} {file.isEdited ? '(edited)' : ''} </td>
                    <td>{moment(file.createdAt).format('MMMM Do YYYY, h:mm:ss a') || "--"}</td>
                    <td>{moment(file.updatedAt).format('MMMM Do YYYY, h:mm:ss a') || "--"}</td>
                    <td>
                      <div className="d-flex align-items-center action-btn-wrp justify-content-center">
                        <div className="px-2 action-btn">
                          <Button onClick={() => handleEdit(file)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3043 2.75 17.863 2.75C18.421 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.571 21.275 6.113C21.2917 6.65433 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z"
                                fill="white"
                              />
                            </svg>
                          </Button>
                        </div>
                        <div className="px-2 action-btn">
                          <Button onClick={() => handleDelete(file._id, i)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M20.37 8.91L19.37 10.64L7.24 3.64L8.24 1.91L11.28 3.66L12.64 3.29L16.97 5.79L17.34 7.16L20.37 8.91ZM6 19V7H11.07L18 11V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H8C7.46957 21 6.96086 20.7893 6.58579 20.4142C6.21071 20.0391 6 19.5304 6 19Z"
                                fill="white"
                              />
                            </svg>
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>)
                }
              </tbody>
            </table>
                {uploadFiles.length <= 0 && <div col className="text-center w-100">No File Uploaded</div>}
          </div>
        </Container>
      </div>
      <Modal
        show={showModal}
        onHide={() => setShowModal(!showModal)}
        centered
        scrollable={true}
      >
        <Modal.Header className="bg-white" closeButton>
          <Modal.Title className="">Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-bodyy">
          <Button className="modal-edit-btn" onClick={handleClickEdit}>
            Upload File
          </Button>
          <input
            type="file"
            ref={fileInputEdit}
            onChange={handleChangeEdit}
            style={{ display: "none" }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
