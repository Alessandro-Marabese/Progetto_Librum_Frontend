import { Button, Form, Modal } from "react-bootstrap";
import { getCurrentUser, updateUser } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function ModalUpdateUser({ utente, show, onHide, onUpdate }) {
  const dispatch = useDispatch();

  const [nome, setNome] = useState(utente.nome || "");
  const [cognome, setCognome] = useState(utente.cognome || "");
  const [email, setEmail] = useState(utente.email || "");
  const [username, setUsername] = useState(utente.username || "");

  useEffect(() => {
    if (utente) {
      setNome(utente.nome || "");
      setCognome(utente.cognome || "");
      setEmail(utente.email || "");
      setUsername(utente.username || "");
    }
  }, [utente, show]);

  const handleSave = () => {
    const userData = { nome, cognome, email, username };
    dispatch(updateUser(utente.id, userData)).then(() => {
      dispatch(getCurrentUser());
      onUpdate?.();
      onHide();
    });
  };
  return (
    <Modal show={show} onHide={onHide} className="profile-modal">
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Surname</Form.Label>
            <Form.Control type="text" value={cognome} onChange={(e) => setCognome(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalUpdateUser;
