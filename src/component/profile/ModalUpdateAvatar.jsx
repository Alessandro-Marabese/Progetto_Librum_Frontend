import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getCurrentUser, updateUserAvatar } from "../../redux/actions";

function ModalUpdateAvatar({ show, onHide, utente, onUpdate }) {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSaveAvatar = () => {
    if (!selectedFile) return alert("Please select a file");
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      dispatch(updateUserAvatar(utente.id, formData)).then(() => {
        dispatch(getCurrentUser());
        onUpdate?.();
        onHide();
      });
    } catch (error) {
      alert("Error uploading avatar", error);
    }
  };
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Change Avatar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload new avatar</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSaveAvatar}>
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalUpdateAvatar;
