import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getAuthorByName, getBooksByAuthorId } from "../../redux/actions";
import { Container, Row, Col } from "react-bootstrap";
import "./AutoreDetails.css";

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
    <Container className="authordetail-container">
      <Row className="authordetail-row">
        <Col className="authordetail-photo-col col-3">
          {author.photoUrl ? (
            <img src={author.photoUrl} alt={author.name} />
          ) : (
            <div
              style={{
                width: "100%",
                height: "150px",
                backgroundColor: "#eee",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#666",
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              Nessuna immagine disponibile per questo autore
            </div>
          )}
        </Col>
        <Col className="authordetail-info-col col-9">
          <h1 className="border-bottom">{author.name}</h1>
          {author.dataNascita ? (
            <div className="d-flex align-items-baseline">
              <h5>Born</h5>
              <p className="ms-3">{author.dataNascita}</p>
            </div>
          ) : (
            <div className="d-flex align-items-baseline">
              <h5>Born</h5>
              <p className="ms-3">Non è disponibile la data di nascita di questo autore</p>
            </div>
          )}
          {author.dataMorte ? (
            <div className="d-flex align-items-baseline">
              <h5>Died</h5>
              <p className="ms-3">{author.dataMorte}</p>
            </div>
          ) : (
            <></>
          )}
          <div className="author-genres d-flex align-items-baseline mb-2">
            <h5>Genres</h5>
            {author.generi &&
              author.generi.map((genere) => (
                <Link to={`/generi/${genere}`} key={genere} className="me-2 ms-3">
                  {genere}
                </Link>
              ))}
          </div>
          {author.bio ? (
            <div>
              <h5>Biography</h5>
              <p>{author.bio}</p>
            </div>
          ) : (
            <div>
              <h5>Biography</h5>
              <p>Non è disponibile la biografia di questo autore</p>
            </div>
          )}
        </Col>
      </Row>
      <Row className="authordetail-books">
        <Col>
          <h4 className="border-bottom">
            {author.name}'s books: {books.length}
          </h4>
          {books &&
            books.map((book) => (
              <Row key={book.id} className="authordetail-book-row">
                <Col className="authordetail-book-cover col-3">
                  <img src={book.coverUrl} alt={book.titolo} className="img-fluid" />
                </Col>
                <Col className="authordetail-book-info col-9">
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
