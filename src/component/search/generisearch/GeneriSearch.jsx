import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { getAllGenres, getBooksByGenre } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./GeneriSearch.css";

function GeneriSearch() {
  const dispatch = useDispatch();
  const [genre, setGenre] = useState("");
  const isLoading = useSelector((state) => state.genres.isLoading);
  const fantasy = useSelector((state) => state.genres.fantasy.content) || [];
  const romance = useSelector((state) => state.genres.romance.content) || [];
  const thriller = useSelector((state) => state.genres.thriller.content) || [];
  const allGenres = useSelector((state) => state.genres.content) || [];
  const navigate = useNavigate();
  const placeholderCount = 4;
  console.log(allGenres);

  useEffect(() => {
    dispatch(getBooksByGenre("fantasy"));
    dispatch(getBooksByGenre("romance"));
    dispatch(getBooksByGenre("thriller"));
    dispatch(getAllGenres());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenreSearch = (e) => {
    e.preventDefault();
    if (genre.trim()) {
      navigate(`/generi/${encodeURIComponent(genre.trim().toLowerCase())}`);
      setGenre("");
    }
  };

  return (
    <Container className="genres-container">
      <Row>
        <Col className="genres-main col-10">
          <h1>Genres</h1>
          <div className="genres-search">
            <Form onSubmit={handleGenreSearch} className="search-form">
              <Form.Control type="text" placeholder="Search genre by name" value={genre} onChange={(e) => setGenre(e.target.value)} />
              <Button type="submit">
                <ion-icon name="search-outline"></ion-icon>
              </Button>
            </Form>
          </div>
          <Row className="genre-section">
            <h3>Fantasy</h3>
            {isLoading
              ? Array.from({ length: placeholderCount }).map((_, idx) => (
                  <Col key={idx} className="genre-card-col col-3 mb-3">
                    <Card className="placeholder"></Card>
                  </Col>
                ))
              : fantasy?.slice(0, 4).map((book) => (
                  <Col key={book.id} className="genre-card-col col-3">
                    <Link to={`/libro/${encodeURIComponent(book.id)}`}>
                      <Card.Img variant="top" src={book.coverUrl} />
                    </Link>
                  </Col>
                ))}
          </Row>
          <Row className="genre-section">
            <h3>Romance</h3>
            {isLoading
              ? Array.from({ length: placeholderCount }).map((_, idx) => (
                  <Col key={idx} className="genre-card-col col-3 mb-3">
                    <Card className="placeholder"></Card>
                  </Col>
                ))
              : romance?.slice(0, 4).map((book) => (
                  <Col key={book.id} className="genre-card-col col-3">
                    <Link to={`/libro/${encodeURIComponent(book.id)}`}>
                      <Card.Img variant="top" src={book.coverUrl} />
                    </Link>
                  </Col>
                ))}
          </Row>
          <Row className="genre-section">
            <h3>Thriller</h3>
            {isLoading
              ? Array.from({ length: placeholderCount }).map((_, idx) => (
                  <Col key={idx} className="genre-card-col col-3 mb-3">
                    <Card className="placeholder"></Card>
                  </Col>
                ))
              : thriller?.slice(0, 4).map((book) => (
                  <Col key={book.id} className="genre-card-col col-3">
                    <Card>
                      <Link to={`/libro/${encodeURIComponent(book.id)}`}>
                        <Card.Img variant="top" src={book.coverUrl} />
                      </Link>
                    </Card>
                  </Col>
                ))}
          </Row>
        </Col>
        <Col className="genres-sidebar col-2">
          <h3>All Genres</h3>
          {isLoading ? (
            <div className="genres-loading">
              <Spinner />
            </div>
          ) : (
            <ul>
              {allGenres.map((genre) => (
                <Link key={genre.id} to={`/generi/${encodeURIComponent(genre.name.toLowerCase())}`}>
                  <li>{genre.name}</li>
                </Link>
              ))}
            </ul>
          )}
        </Col>
      </Row>
    </Container>
  );
}
export default GeneriSearch;
