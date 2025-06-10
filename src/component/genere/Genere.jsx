import { useEffect } from "react";
import { Container, Row, Col, Card, Placeholder } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getBooksByGenre } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";
import "./Genere.css";

function Genere() {
  const { genereName } = useParams();
  const dispatch = useDispatch();
  const searchedGenre = useSelector((state) => state.genres.searchedGenre);
  const books = searchedGenre?.books || [];
  const isLoading = useSelector((state) => state.genres.isLoading);
  const placeholderCount = 8;

  useEffect(() => {
    if (genereName) {
      dispatch(getBooksByGenre(genereName));
    }
  }, [dispatch, genereName]);

  return (
    <Container className="genre-detail-container">
      <div className="genre-header d-flex align-items-center justify-content-between">
        <h1>{genereName.toUpperCase()}</h1>
        <Link to={"/generi"}>Back to All Genres</Link>
      </div>
      <Row className="genre-grid">
        {isLoading
          ? Array.from({ length: placeholderCount }).map((_, idx) => (
              <Col key={idx} className="genre-item col-3 mb-3">
                <Card></Card>
              </Col>
            ))
          : books?.content?.map((book) => (
              <Col key={book.id} className="genre-item col-3">
                <Link to={`/libro/${encodeURIComponent(book.id)}`}>
                  <Card.Img variant="top" src={book.coverUrl} />
                </Link>
              </Col>
            ))}
      </Row>
    </Container>
  );
}

export default Genere;
