import { Col, Container, Row, Image } from "react-bootstrap";
import { getCurrentUser, getFriendsByUser, getReviewsByUser, getUserBookByUser, getViewedUser } from "../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const utente = useSelector((state) => state.users.content);
  const utenteVisitato = useSelector((state) => state.users.utenteVisitato);
  const friends = useSelector((state) => state.friends.content);
  const userBooks = useSelector((state) => state.userBook.content);
  const reviews = useSelector((state) => state.reviews.content);
  console.log(reviews);

  const generiPreferiti = Array.from(new Set(userBooks.flatMap((userbook) => userbook.libro?.nomiGeneri || []))).sort();

  useEffect(() => {
    if (id) {
      dispatch(getViewedUser(id));
    } else {
      dispatch(getCurrentUser());
    }
  }, [dispatch, id]);

  const utenteAttuale = id ? utenteVisitato : utente;

  useEffect(() => {
    const user = id ? utenteVisitato : utente;
    if (user?.id) {
      dispatch(getFriendsByUser(user.id));
      dispatch(getUserBookByUser(user.id));
      dispatch(getReviewsByUser(user.id));
    }
  }, [dispatch, id, utente, utenteVisitato]);
  return (
    <Container>
      <Row className="mt-3">
        <Col className="col-9">
          <Row>
            <Col className="col-3">
              <Image src={utenteAttuale.avatar} alt="Avatar" className="img-fluid" />
            </Col>
            <Col>
              <h3 className="border-secondary border-bottom">
                {utenteAttuale.nome} {utenteAttuale.cognome}
              </h3>

              <h4>Informations</h4>
              <p>Name: {utenteAttuale.nome}</p>
              <p>Surname: {utenteAttuale.cognome}</p>
              <p>Username: {utenteAttuale.username}</p>
              <p>Email: {utenteAttuale.email}</p>
            </Col>
          </Row>
          <Row className="justify-content-around">
            <h6 className="border-secondary border-bottom">{utenteAttuale.nome}'s Bookshelves</h6>
            <Col>
              <Link to="/mybooks">To read</Link>
            </Col>
            <Col>
              <Link to="/mybooks">Currently-reading</Link>
            </Col>
            <Col>
              <Link to="/mybooks">Read</Link>
            </Col>
          </Row>
          <Row>
            <h6 className="border-secondary border-bottom">{utenteAttuale.nome}'s Books Update</h6>
            {userBooks.map((userbook) => {
              const libro = userbook.libro;

              let azione = "";
              if (userbook.statoLettura === "WANT_TO_READ") {
                azione = "wants to read";
              } else if (userbook.statoLettura === "CURRENTLY_READING") {
                azione = "is reading";
              } else if (userbook.statoLettura === "READ") {
                azione = "has read";
              }
              return (
                <Col key={libro.id} className="mb-3 border-bottom pb-3 col-12">
                  <p>
                    <Link to={"/profile"}>
                      {utenteAttuale.nome} {utenteAttuale.cognome}
                    </Link>{" "}
                    {azione}
                  </p>
                  <Row>
                    <Col xs={3}>
                      <Image src={libro.coverUrl} alt="Cover" className="img-fluid" />
                    </Col>
                    <Col>
                      <h5>
                        <Link to={`/libro/${encodeURIComponent(libro.id)}`}>{libro.titolo}</Link>
                      </h5>
                      <p className="text-muted">
                        by <Link to={`/autore/${libro.nomiAutori?.[0]}`}>{libro.nomiAutori?.[0]}</Link>
                      </p>
                      <p className="text-muted">Added to {azione.replace("has ", "").replace("is ", "")} list.</p>
                    </Col>
                  </Row>
                </Col>
              );
            })}
          </Row>
          <Row>
            <h6 className="border-secondary border-bottom">{utenteAttuale.nome}'s Reviews</h6>
            {reviews.content &&
              reviews.content.map((review) => {
                const libro = review.libro;
                return (
                  <Col key={review.id} className="mb-3 border-bottom pb-3 col-12">
                    <div className="d-flex">
                      <p>
                        <Link to="/profile">
                          {utenteAttuale.nome} {utenteAttuale.cognome}
                        </Link>{" "}
                        rated a book
                      </p>
                      <div>
                        {[1, 2, 3, 4, 5].map((num) => (
                          <ion-icon
                            key={num}
                            name={review.rating >= num ? "star" : "star-outline"}
                            style={{
                              cursor: "default",
                              fontSize: "20px",
                              color: "#ffc107",
                              marginRight: "3px",
                            }}
                          ></ion-icon>
                        ))}
                      </div>
                    </div>
                    <Row>
                      <Col xs={3}>
                        <Link to={`/libro/${encodeURIComponent(libro.id)}`}>
                          <Image src={libro.coverUrl} alt="Cover" className="img-fluid" />
                        </Link>
                      </Col>
                      <Col>
                        <h5>
                          <Link to={`/libro/${encodeURIComponent(libro.id)}`}>{libro.titolo}</Link>
                        </h5>
                        <p className="text-muted">
                          by <Link to={`/autore/${libro.nomiAutori?.[0]}`}>{libro.nomiAutori?.[0]}</Link>
                        </p>
                        <p>{review.commento}</p>
                        <p>{review.dataCreazione}</p>
                      </Col>
                    </Row>
                  </Col>
                );
              })}
          </Row>
        </Col>

        <Col className="col-3">
          <Row>
            <h6 className="border-secondary border-bottom">{utenteAttuale.nome}'s Friends</h6>
            {friends &&
              friends.length > 0 &&
              friends.map((friend) => (
                <Col key={friend.id} className="col-3">
                  <Image src={friend.avatar} alt="Avatar" className="img-fluid" as={Link} to={`/profile/${friend.id}`} />
                  <p>
                    <Link to={`/profile/${friend.id}`}>
                      {friend.nome} {friend.cognome}
                    </Link>
                  </p>
                </Col>
              ))}
          </Row>
          <Row>
            <h6 className="border-secondary border-bottom">Favorite Genres</h6>
            <ul>
              {generiPreferiti.map((genere, i) => (
                <li key={i}>
                  <Link to={`/generi/${genere}`}>{genere}</Link>
                </li>
              ))}
            </ul>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
export default Profile;
