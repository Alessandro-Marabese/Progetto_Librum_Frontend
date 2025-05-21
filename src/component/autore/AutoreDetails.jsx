import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getAuthorByName, getBooksByAuthorId } from "../../redux/actions";
import { Container, Row, Col } from "react-bootstrap";

function AutoreDetails() {
  const dispatch = useDispatch();
  const { autoreName } = useParams();
  const author = useSelector((state) => state.authors?.content) || [];
  const rawBooks = useSelector((state) => state.books?.content);
  const books = Array.isArray(rawBooks) ? rawBooks : rawBooks ? [rawBooks] : [];
  const [hasLoadedBooks, setHasLoadedBooks] = useState(false);
  console.log(books);

  useEffect(() => {
    dispatch(getAuthorByName(autoreName));
    setHasLoadedBooks(false);
  }, [dispatch, autoreName]);

  useEffect(() => {
    if (author?.name && !hasLoadedBooks) {
      dispatch(getBooksByAuthorId(author.id));
      setHasLoadedBooks(true);
    }
  }, [dispatch, author.name, author.id, hasLoadedBooks]);

  return (
    <Container>
      <Row>
        <Col className="col-3">
          <img src={author.photoUrl} alt={author.name} className="img-fluid" />
        </Col>
        <Col className="col-9">
          <h1 className="border-bottom">{author.name}</h1>
          <div className="d-flex">
            <h5>Born</h5>
            <p>{author.dataNascita}</p>
          </div>
          {author.dataMorte ? (
            <div className="d-flex">
              <h5>Died</h5>
              <p>{author.dataMorte}</p>
            </div>
          ) : (
            <div></div>
          )}
          <div className="d-flex">
            <h5>Genres</h5>
            {author.generi &&
              author.generi.map((genere) => (
                <Link to={`/genres/${genere}`} key={genere} className="me-2">
                  {genere}
                </Link>
              ))}
          </div>
          <div>
            <h5>Biography</h5>
            <p>{author.bio}</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="border-bottom">
            {author.name}'s books: {books.length}
          </h4>
          {books &&
            books.map((book) => (
              <Row key={book.id}>
                <Col className="col-3">
                  <img src={book.coverUrl} alt={book.titolo} className="img-fluid" />
                </Col>
                <Col className="col-9">
                  <Link to={`/libro/${encodeURIComponent(book.id)}`} className="me-2">
                    {book.titolo}
                  </Link>
                  <p>
                    by <Link to={`/autore/${book.nomiAutori[0]}`}>{book.nomiAutori[0]}</Link>
                  </p>
                </Col>
              </Row>
            ))}
        </Col>
      </Row>
    </Container>
  );
}
export default AutoreDetails;
