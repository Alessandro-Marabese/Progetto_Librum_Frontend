import { Container, Button, Form, Row, Col, Placeholder } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksByAuthor, getBooksByTitle } from "../../../redux/actions";
import { Link, useLocation } from "react-router-dom";
import "./Search.css";

function Search() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const passedTitle = location.state?.title;
  const books = useSelector((state) => state.books?.content?.content) || [];

  useEffect(() => {
    if (passedTitle) {
      dispatch(getBooksByTitle(passedTitle));
    }
  }, [dispatch, passedTitle]);

  const handleTitleSearch = (e) => {
    e.preventDefault();
    if (title.trim()) {
      setLoading(true);
      dispatch(getBooksByTitle(title));
      setLoading(false);
      setTitle("");
    }
  };
  const handleAuthorSearch = (e) => {
    e.preventDefault();
    if (author.trim()) {
      setLoading(true);
      dispatch(getBooksByAuthor(author));
      setLoading(false);
      setAuthor("");
    }
  };
  return (
    <Container className="search-container">
      <div className="search-forms">
        <h2 className="search-title">Search by Title</h2>
        <Form onSubmit={handleTitleSearch} className="search-form">
          <Form.Control type="text" placeholder="Search by Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Button type="submit">
            <ion-icon name="search-outline"></ion-icon>
          </Button>
        </Form>
        <h2 className="search-title">Search by Author</h2>
        <Form onSubmit={handleAuthorSearch} className="search-form">
          <Form.Control type="text" placeholder="Search by Title" value={author} onChange={(e) => setAuthor(e.target.value)} />
          <Button type="submit">
            <ion-icon name="search-outline"></ion-icon>
          </Button>
        </Form>
      </div>

      {loading && (
        <div className="search-loading d-flex justify-content-center my-4">
          <Placeholder xs={3} />
          <Placeholder xs={3} />
          <Placeholder xs={3} />
        </div>
      )}
      {!loading && (
        <div className="search-results">
          {books.length === 0 ? (
            <Row></Row>
          ) : (
            books.map((book, index) => (
              <Row key={index} className="search-item mb-3">
                <Col className="search-cover col-3">
                  <img src={book.coverUrl} alt={book.titolo} className="img-fluid" />
                </Col>
                <Col className="search-details col-9">
                  <h3>
                    <Link to={`/libro/${encodeURIComponent(book.id)}`}>{book.titolo}</Link>
                  </h3>
                  <p>
                    by <Link to={`/autore/${book.nomiAutori[0]}`}>{book.nomiAutori[0]}</Link>
                  </p>
                  <p>Primo anno di pubblicazione {book.primoAnnoPubblicazione}</p>
                </Col>
              </Row>
            ))
          )}
        </div>
      )}
    </Container>
  );
}
export default Search;
