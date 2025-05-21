import { useEffect, useMemo } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAuthorByName, getBookById } from "../../redux/actions";
import { Link } from "react-router-dom";

function LibroDetails() {
  const dispatch = useDispatch();
  const { libroId } = useParams();
  const rawBook = useSelector((state) => state.books?.content);

  const book = useMemo(() => rawBook || {}, [rawBook]);
  const author = useSelector((state) => state.authors?.content) || [];

  useEffect(() => {
    dispatch(getBookById(libroId));
  }, [dispatch, libroId]);

  useEffect(() => {
    if (book?.nomiAutori?.length > 0) {
      dispatch(getAuthorByName(book.nomiAutori[0]));
    }
  }, [dispatch, book]);

  return (
    <Container>
      <Row>
        <Col className="col-3">
          <img src={book.coverUrl} alt={book.titolo} className="img-fluid" />
          <Button>Want to Read</Button>
        </Col>
        <Col className="col-9">
          <h1>{book.titolo}</h1>
          <h3>
            <Link to={`/autore/${book.nomiAutori?.[0]}`}>{book.nomiAutori?.[0] || "Autore sconosciuto"}</Link>
          </h3>
          <p>{book.descrizione}</p>
          <div className="d-flex">
            {book.nomiGeneri &&
              book.nomiGeneri.map((genere) => (
                <Link to={`/genres/${genere}`} key={genere} className="me-2">
                  {genere}
                </Link>
              ))}
          </div>
          <p className="border-bottom">First publish in {book.primoAnnoPubblicazione}</p>
          <div>
            <h2>About the Author</h2>
            {author ? (
              <Row>
                <Col className="col-3">
                  <img src={author.photoUrl} alt={author.name} className="img-fluid" />
                </Col>
                <Col className="col-9">
                  <h3>
                    <Link to={`/autore/${book.nomiAutori?.[0]}`}>{book.nomiAutori?.[0] || "Autore sconosciuto"}</Link>
                  </h3>
                </Col>
                <p>{author.bio}</p>
              </Row>
            ) : (
              <Placeholder as="p" animation="glow">
                <Placeholder xs={6} /> <Placeholder xs={4} /> <Placeholder xs={4} /> <Placeholder xs={6} /> <Placeholder xs={8} />
              </Placeholder>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default LibroDetails;
