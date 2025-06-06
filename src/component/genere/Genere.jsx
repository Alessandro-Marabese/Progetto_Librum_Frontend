import { useEffect } from "react";
import { Container, Row, Col, Card, Placeholder } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getBooksByGenre } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";

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
    <Container>
      <div className="d-flex align-items-center justify-content-between">
        <h1>{genereName.toUpperCase()}</h1>
        <Link to={"/generi"}>Back to All Genres</Link>
      </div>
      <Row>
        {isLoading
          ? Array.from({ length: placeholderCount }).map((_, idx) => (
              <Col key={idx} className="col-3 mb-3">
                <Card style={{ width: "100%", height: "250px", backgroundColor: "#ddd", animation: "placeholder-glow 1.5s infinite" }}></Card>
              </Col>
            ))
          : books?.content?.map((book) => (
              <Col key={book.id} className="col-3">
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
