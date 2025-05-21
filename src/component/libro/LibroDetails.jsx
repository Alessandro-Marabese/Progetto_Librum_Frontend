import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBookById } from "../../redux/actions";
import { Link } from "react-router-dom";

function LibroDetails() {
  const dispatch = useDispatch();
  const { libroId } = useParams();
  const book = useSelector((state) => state.books?.content) || [];

  useEffect(() => {
    dispatch(getBookById(libroId));
  }, [dispatch, libroId]);
  return (
    <Container>
      <Row>
        <Col className="col-3">
          <img src={book.coverUrl} alt={book.titolo} />
        </Col>
        <Col className="col-9">
          <h1>{book.titolo}</h1>
          <h3>
            <Link to={`/authors/${book.nomiAutori?.[0]}`}>{book.nomiAutori?.[0] || "Autore sconosciuto"}</Link>
          </h3>
          <p>{book.descrizione}</p>
        </Col>
      </Row>
    </Container>
  );
}
export default LibroDetails;
