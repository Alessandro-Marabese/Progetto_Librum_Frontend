import { Container, Button, Form, Row, Col, Placeholder } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksByAuthor, getBooksByTitle } from "../../redux/actions";
import { Link } from "react-router-dom";

function Search() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books?.content?.content) || [];

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
    <Container>
      <div>
        <h2>Search by Title</h2>
        <Form onSubmit={handleTitleSearch}>
          <Form.Control type="text" placeholder="Search by Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Button type="submit">
            <ion-icon name="search-outline"></ion-icon>
          </Button>
        </Form>
        <h2>Search by Author</h2>
        <Form onSubmit={handleAuthorSearch}>
          <Form.Control type="text" placeholder="Search by Title" value={author} onChange={(e) => setAuthor(e.target.value)} />
          <Button type="submit">
            <ion-icon name="search-outline"></ion-icon>
          </Button>
        </Form>
      </div>

      {loading && (
        <div className="d-flex justify-content-center my-4">
          <Placeholder xs={3} />
          <Placeholder xs={3} />
          <Placeholder xs={3} />
        </div>
      )}
      {!loading && (
        <div>
          {books.length === 0 ? (
            <Row></Row>
          ) : (
            books.map((book, index) => (
              <Row key={index}>
                <Col className="col-3">
                  <img src={book.coverUrl} alt={book.titolo} className="img-fluid" />
                </Col>
                <Col className="col-9">
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
