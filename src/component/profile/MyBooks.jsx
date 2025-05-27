import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, getUserBookByUser } from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";

function MyBooks() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users?.content);
  const books = useSelector((state) => state.userBook?.content);
  const [selectedShelf, setSelectedShelf] = useState(null);
  const filteredBooks = selectedShelf ? books.filter((book) => book.statoLettura === selectedShelf) : books;
  console.log(books);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(getUserBookByUser(currentUser.id));
    }
  }, [dispatch, currentUser]);

  const formatStatoLettura = (stato) => {
    switch (stato) {
      case "WANT_TO_READ":
        return "Want To Read";
      case "CURRENTLY_READING":
        return "Currently Reading";
      case "READ":
        return "Read";
      default:
        return stato;
    }
  };

  return (
    <Container>
      <h1>My Books</h1>
      <div>
        <Form className="d-flex">
          <Form.Control type="search" placeholder="Search book to add" className="me-2" aria-label="Search" />
          <Button variant="outline-success" onClick={() => navigate("/search?")}>
            <ion-icon name="search-outline"></ion-icon>
          </Button>
        </Form>
      </div>
      <Row>
        <Col className="col-3">
          <h3>My Bookshelves</h3>
          <ul>
            <li onClick={() => setSelectedShelf("WANT_TO_READ")}>Want to Read </li>
            <li onClick={() => setSelectedShelf("CURRENTLY_READING")}>Currently Reading</li>
            <li onClick={() => setSelectedShelf("READ")}>Read</li>
            <li onClick={() => setSelectedShelf(null)}>All Books</li>
          </ul>
        </Col>
        <Col className="col-9">
          <Row>
            <ul>
              <li>Cover</li>
              <li>Title</li>
              <li>Author</li>
              <li>Avg Rating</li>
              <li>Rating</li>
              <li>Bookshelves</li>
            </ul>
          </Row>
          {filteredBooks.map((book) => (
            <Row key={book.libro.id}>
              <Col>
                <img src={book.libro.coverUrl} alt={book.libro.titolo} className="img-fluid" />
              </Col>
              <Col>
                <Link to={`/libro/${encodeURIComponent(book.libro.id)}`}>{book.libro.titolo}</Link>
              </Col>
              <Col>
                <Link to={`/autore/${book.libro.nomiAutori[0]}`}>{book.libro.nomiAutori?.[0]}</Link>
              </Col>
              <Col></Col>
              <Col></Col>
              <Col>{formatStatoLettura(book.statoLettura)}</Col>
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
export default MyBooks;
