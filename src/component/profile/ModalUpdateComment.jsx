import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getCommentByUser, updateComment } from "../../redux/actions";

function ModalUpdateComment({ show, onHide, comment, utente }) {
  const dispatch = useDispatch();

  const [testo, setTesto] = useState("");

  useEffect(() => {
    if (comment && comment.testo) {
      setTesto(comment.testo);
    }
  }, [comment]);

  const handleUpdateComment = () => {
    dispatch(updateComment(comment.id, testo, utente.id, comment.reviewId)).then(() => {
      dispatch(getCommentByUser(utente.id));
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Testo</Form.Label>
            <Form.Control type="text" value={testo} onChange={(e) => setTesto(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateComment}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalUpdateComment;
