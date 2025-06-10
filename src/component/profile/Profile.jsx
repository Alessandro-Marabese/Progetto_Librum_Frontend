import { Col, Container, Row, Image, Button } from "react-bootstrap";
import { getCurrentUser, getFriendsByUser, getReviewsByUser, getUserBookByUser, getViewedUser } from "../../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalUpdateAvatar from "./ModalUpdateAvatar";
import "./Profile.css";

function Profile() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const utente = useSelector((state) => state.users.content);
  const utenteVisitato = useSelector((state) => state.users.utenteVisitato);
  const friends = useSelector((state) => state.friends.content);
  const userBooks = useSelector((state) => state.userBook.content);
  const reviews = useSelector((state) => state.reviews.content);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const generiPreferiti = Array.from(new Set(userBooks.flatMap((userbook) => userbook.libro?.nomiGeneri || []))).sort();

  useEffect(() => {
    if (id) {
      dispatch(getViewedUser(id));
    } else {
      dispatch(getCurrentUser());
    }
  }, [dispatch, id, reloadTrigger]);

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
    <Container className="profile-container">
      <Row className="profile-row mt-3">
        <Col className="profile-main col-9">
          <Row className="profile-header-row">
            <Col className="col-3">
              <Image src={utenteAttuale.avatar} alt="Avatar" className="img-fluid" />
            </Col>
            <Col>
              <h3 className="border-secondary border-bottom">
                {utenteAttuale.nome} {utenteAttuale.cognome}
              </h3>
              <div className="profile-info">
                <h4>Informations</h4>
                <p>Name: {utenteAttuale.nome}</p>
                <p>Surname: {utenteAttuale.cognome}</p>
                <p>Username: {utenteAttuale.username}</p>
                <p>Email: {utenteAttuale.email}</p>
              </div>
              <div>
                <Button className="btn  me-2" onClick={() => setShowEditModal(true)}>
                  Edit Profile
                </Button>
                <ModalUpdateUser
                  show={showEditModal}
                  onHide={() => {
                    setShowEditModal(false);
                  }}
                  utente={utente}
                  onUpdate={() => {
                    setReloadTrigger((prev) => prev + 1);
                  }}
                />
                <Button className="btn " onClick={() => setShowAvatarModal(true)}>
                  Change Avatar
                </Button>
                <ModalUpdateAvatar
                  show={showAvatarModal}
                  onHide={() => setShowAvatarModal(false)}
                  utente={utente}
                  onUpdate={() => setReloadTrigger((prev) => prev + 1)}
                />
              </div>
            </Col>
          </Row>
          <Row className="profile-section justify-content-around">
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
          <Row className="profile-section profile-books-update">
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
                <Col key={libro.id} className="profile-book-update-row mb-3 border-bottom pb-3 col-12">
                  <p>
                    <Link to={"/profile"}>
                      {utenteAttuale.nome} {utenteAttuale.cognome}
                    </Link>{" "}
                    {azione}
                  </p>
                  <Row>
                    <Col xs={3} className="profile-book-cover">
                      <Image src={libro.coverUrl} alt="Cover" className="img-fluid" />
                    </Col>
                    <Col className="profile-book-info">
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
          <Row className="profile-section">
            <h6 className="border-secondary border-bottom">{utenteAttuale.nome}'s Reviews</h6>
            {reviews.content &&
              reviews.content.map((review) => {
                const libro = review.libro;
                return (
                  <Col key={review.id} className="profile-review-item mb-3 border-bottom pb-3 col-12">
                    <div className="d-flex profile-review-content review-info">
                      <p>
                        <Link to="/profile">
                          {utenteAttuale.nome} {utenteAttuale.cognome}
                        </Link>{" "}
                        rated a book
                      </p>
                      <div className="stars ms-2">
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
                    <Row className="profile-review-row">
                      <Col xs={3} className="profile-review-avatar">
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

        <Col className="profile-sidebar col-3">
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
            <ul className="genres-list">
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
