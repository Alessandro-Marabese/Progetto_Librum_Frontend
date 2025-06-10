import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addUserBook } from "../../redux/actions";

function WantToReadModal(props) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users?.content);

  const handleAddUserBook = (readingStatus) => {
    const userBook = {
      userId: currentUser?.id,
      bookId: props.book.id,
      statoLettura: readingStatus,
    };
    dispatch(addUserBook(userBook));
    props.onHide();
  };
  return (
    <Modal className="add-book-modal" size="xs" aria-labelledby="contained-modal-title-vcenter" centered show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button onClick={() => handleAddUserBook("WANT_TO_READ")}>Want to Read</Button>
        <Button onClick={() => handleAddUserBook("CURRENTLY_READING")}>Currently reading</Button>
        <Button onClick={() => handleAddUserBook("READ")}>Read</Button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default WantToReadModal;
