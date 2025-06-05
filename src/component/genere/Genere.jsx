import { useEffect } from "react";
import { Container, Row, Col, Spinner, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getBooksByGenre } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";

function Genere() {
  const { genereName } = useParams();
  const dispatch = useDispatch();
  const searchedGenre = useSelector((state) => state.genres.searchedGenre);
  const books = searchedGenre?.books || [];
  const isLoading = useSelector((state) => state.genres.isLoading);
  console.log(books);
  useEffect(() => {
    if (genereName) {
      dispatch(getBooksByGenre(genereName));
    }
  }, [dispatch, genereName]);
  return (
    <Container>
      <h1>{genereName.toUpperCase()}</h1>
      <Row>
        {isLoading ? (
          <Spinner animation="border" />
        ) : (
          books?.content?.map((book) => (
            <Col key={book.id} className="col-3">
              <Link to={`/libro/${encodeURIComponent(book.id)}`}>
                <Card.Img variant="top" src={book.coverUrl} />
              </Link>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default Genere;
