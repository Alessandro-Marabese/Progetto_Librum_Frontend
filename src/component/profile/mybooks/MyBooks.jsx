import { useEffect, useState } from "react";
import { Button, Col, Container, Dropdown, DropdownButton, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, getReviewsByBook, getReviewsByUser, getUserBookByUser, updateStatusUserbook } from "../../../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import "./MyBooks.css";

function MyBooks() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users?.content);
  const books = useSelector((state) => state.userBook?.content);
  const [selectedShelf, setSelectedShelf] = useState(null);
  const filteredBooks = selectedShelf ? books.filter((book) => book.statoLettura === selectedShelf) : books;
  const reviewsByUser = useSelector((state) => state.reviews?.content?.content) || [];
  const reviewsByBook = useSelector((state) => state.reviews?.reviewsByBook?.content) || {};
  console.log(reviewsByBook);
  const isLoadingReviews = books?.length > 0 && reviewsByUser.length === 0;
  const [title, setTitle] = useState("");

  const wantToReadCount = books.filter((book) => book.statoLettura === "WANT_TO_READ").length;
  const currentlyReadingCount = books.filter((book) => book.statoLettura === "CURRENTLY_READING").length;
  const readCount = books.filter((book) => book.statoLettura === "READ").length;
  const allBooksCount = books.length;

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(getUserBookByUser(currentUser.id));
      dispatch(getReviewsByUser(currentUser.id));
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (books && books?.length > 0) {
      books.forEach((book) => {
        dispatch(getReviewsByBook(book.libro.id));
      });
    }
  }, [books, dispatch]);

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

  const handleStatusChange = (libroId, nuovoStato) => {
    if (currentUser?.id && nuovoStato) {
      dispatch(updateStatusUserbook(currentUser.id, libroId, nuovoStato)).then(() => {
        dispatch(getUserBookByUser(currentUser.id));
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (title.trim()) {
      navigate("/search", { state: { title: title.trim() } });
      setTitle("");
    } else {
      navigate("/search?");
    }
  };

  return (
    <Container className="mybooks-container">
      <h1>My Books</h1>
      <div className="mybooks-search">
        <Form className="d-flex" onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Search book to add"
            className="me-2"
            aria-label="Search"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button type="submit">
            <ion-icon name="search-outline"></ion-icon>
          </Button>
        </Form>
      </div>
      <Row>
        <Col className="mybooks-shelves col-3 mt-3">
          <h3>My Bookshelves</h3>
          <ul className="mybooks-first-list">
            <li onClick={() => setSelectedShelf("WANT_TO_READ")}>Want to Read ({wantToReadCount}) </li>
            <li onClick={() => setSelectedShelf("CURRENTLY_READING")}>Currently Reading ({currentlyReadingCount})</li>
            <li onClick={() => setSelectedShelf("READ")}>Read ({readCount})</li>
            <li onClick={() => setSelectedShelf(null)}>All Books ({allBooksCount})</li>
          </ul>
        </Col>
        <Col className="col-9 mt-4">
          <Row className="mybooks-header-row mb-4">
            <Col>Cover</Col>
            <Col>Title</Col>
            <Col>Author</Col>
            <Col>My Rating</Col>
            <Col>Bookshelf</Col>
          </Row>
          {filteredBooks &&
            filteredBooks.map((book) => {
              const review = reviewsByUser.find((r) => r.libro?.id === book.libro.id);
              const rating = review?.rating;

              const reviewsForThisBook = reviewsByBook[book.libro.id] || [];
              console.log(reviewsForThisBook);

              return (
                <Row key={book.libro.id} className="book-row">
                  <Col className="book-cover">
                    <img src={book.libro.coverUrl} alt={book.libro.titolo} className="img-fluid" />
                  </Col>
                  <Col className="book-title">
                    <Link to={`/libro/${encodeURIComponent(book.libro.id)}`}>{book.libro.titolo}</Link>
                  </Col>
                  <Col className="book-author">
                    <Link to={`/autore/${book.libro.nomiAutori[0]}`}>{book.libro.nomiAutori?.[0]}</Link>
                  </Col>
                  <Col className="book-rating">
                    <div>
                      {isLoadingReviews ? (
                        <span>Loading rating...</span>
                      ) : (
                        [1, 2, 3, 4, 5].map((num) => (
                          <ion-icon
                            key={num}
                            name={rating >= num ? "star" : "star-outline"}
                            style={{
                              cursor: "default",
                              fontSize: "20px",
                              color: "#ffc107",
                              marginRight: "3px",
                            }}
                          />
                        ))
                      )}
                    </div>
                  </Col>
                  <Col className="book-shelf-dropdown">
                    <DropdownButton id={`dropdown-${book.libro.id}`} title={formatStatoLettura(book.statoLettura)} variant="outline-secondary" size="sm">
                      {["WANT_TO_READ", "CURRENTLY_READING", "READ"]
                        .filter((stato) => stato !== book.statoLettura)
                        .map((stato) => (
                          <Dropdown.Item key={stato} onClick={() => handleStatusChange(book.libro.id, stato)}>
                            {formatStatoLettura(stato)}
                          </Dropdown.Item>
                        ))}
                    </DropdownButton>
                  </Col>
                </Row>
              );
            })}
        </Col>
      </Row>
    </Container>
  );
}
export default MyBooks;
