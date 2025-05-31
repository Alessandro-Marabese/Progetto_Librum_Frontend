import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../redux/actions";

function ReviewModal(props) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading);
  const [commento, setCommento] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const { currentUser } = props;

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5 || !commento.trim()) {
      alert("Devi inserire un commento valido e un rating tra 1 e 5 stelle.");
      return;
    }

    const review = {
      commento,
      rating,
      libroId: props.book.id,
      utenteId: currentUser?.id,
    };

    const result = dispatch(addReview(review));
    if (result) {
      setShowSuccess(true);
      setCommento("");
      setRating(0);
      setTimeout(() => {
        setShowSuccess(false);
        props.onHide();
      }, 2000);
    }
  };
  return (
    <Modal size="xs" aria-labelledby="contained-modal-title-vcenter" centered show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Leave a Review</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-block">
        {showSuccess && <Alert variant="success">Recensione inviata con successo!</Alert>}
        <Form onSubmit={(event) => handleSubmitReview(event)}>
          <Form.Group controlId="formCommento">
            <Form.Label>Commento</Form.Label>
            <Form.Control as="textarea" rows={4} value={commento} onChange={(e) => setCommento(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formRating">
            <Form.Label>Rating</Form.Label>
            <div>
              {[1, 2, 3, 4, 5].map((num) => (
                <ion-icon
                  key={num}
                  name={(hoverRating || rating) >= num ? "star" : "star-outline"}
                  onClick={() => setRating(num)}
                  onMouseEnter={() => setHoverRating(num)}
                  onMouseLeave={() => setHoverRating(0)}
                  style={{
                    cursor: "pointer",
                    fontSize: "28px",
                    color: "#ffc107",
                    marginRight: "5px",
                    transition: "color 200ms",
                  }}
                ></ion-icon>
              ))}
            </div>
          </Form.Group>
          <div className="mt-4 d-flex justify-content-end">
            <Button variant="secondary" onClick={props.onHide} className="me-2">
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? <Spinner animation="border" size="sm" /> : "Invia Recensione"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
export default ReviewModal;
