import { Col, Container, Row, Image, Button, Spinner } from "react-bootstrap";
import {
  getCurrentUser,
  getFriendsByOtherUser,
  getFriendsByUser,
  getReviewsByUser,
  getUserBookByUser,
  getViewedUser,
  sendFriendRequest,
} from "../../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalUpdateAvatar from "./ModalUpdateAvatar";
import "./Profile.css";

function Profile() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const me = useSelector((state) => state.users.content);
  const visited = useSelector((state) => state.users.utenteVisitato);

  const userBooks = useSelector((state) => state.userBook.content);
  const reviews = useSelector((state) => state.reviews.content);

  const myFriends = useSelector((state) => state.friends.myFriends);
  const userFriends = useSelector((state) => state.friends.userFriends.content);
  const isFriendsLoading = useSelector((state) => state.friends.isLoading);
  console.log(userFriends);
  console.log(myFriends);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const generiPreferiti = Array.from(new Set(userBooks.flatMap((userbook) => userbook.libro?.nomiGeneri || []))).sort();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  // 2) Appena me.id è disponibile: carico i miei amici
  useEffect(() => {
    if (me?.id) {
      dispatch(getFriendsByUser(me.id));
    }
  }, [dispatch, me?.id]);

  // 3) Quando cambia id in URL: carico l’utente visitato
  useEffect(() => {
    if (id) {
      dispatch(getViewedUser(id));
    }
  }, [dispatch, id]);

  // 4) Appena visited.id è disponibile: carico gli amici di visited
  useEffect(() => {
    if (visited?.id) {
      dispatch(getFriendsByOtherUser(visited.id));
    }
  }, [dispatch, visited?.id]);

  useEffect(() => {
    const user = id ? visited : me;
    if (user?.id) {
      dispatch(getUserBookByUser(user.id));
      dispatch(getReviewsByUser(user.id));
    }
  }, [dispatch, id, me, visited, reloadTrigger]);

  const isOwner = !id || me.id === visited.id;
  const friendsToShow = isOwner ? myFriends : userFriends;

  const isFriend = !isOwner && myFriends.some((f) => f.id === visited.id);

  const handleAddFriend = () => {
    dispatch(sendFriendRequest(me.id, visited.id)).then(() => dispatch(getFriendsByUser(me.id)));
  };

  const userToShow = isOwner ? me : visited;

  return (
    <Container className="profile-container">
      <Row className="profile-row mt-3">
        <Col className="profile-main col-9">
          <Row className="profile-header-row">
            <Col className="col-3">
              <Image src={userToShow.avatar} alt="Avatar" className="img-fluid" />
            </Col>
            <Col>
              <h3 className="border-secondary border-bottom">
                {userToShow.nome} {userToShow.cognome}
              </h3>
              <div className="profile-info">
                <h4>Informations</h4>
                <p>Name: {userToShow.nome}</p>
                <p>Surname: {userToShow.cognome}</p>
                <p>Username: {userToShow.username}</p>
                <p>Email: {userToShow.email}</p>
              </div>
              <div>
                {isOwner ? (
                  <>
                    <Button className="btn  me-2" onClick={() => setShowEditModal(true)}>
                      Edit Profile
                    </Button>
                    <ModalUpdateUser
                      show={showEditModal}
                      onHide={() => {
                        setShowEditModal(false);
                      }}
                      utente={me}
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
                      utente={me}
                      onUpdate={() => setReloadTrigger((prev) => prev + 1)}
                    />
                  </>
                ) : (
                  <>
                    {!isFriend ? (
                      <Button variant="primary" onClick={handleAddFriend}>
                        Add Friend
                      </Button>
                    ) : (
                      <Button variant="danger">Delete Friend</Button>
                    )}
                  </>
                )}
              </div>
            </Col>
          </Row>
          <Row className="profile-section justify-content-around">
            <h6 className="border-secondary border-bottom">{userToShow.nome}'s Bookshelves</h6>
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
            <h6 className="border-secondary border-bottom">{userToShow.nome}'s Books Update</h6>
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
                      {userToShow.nome} {userToShow.cognome}
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
            <h6 className="border-secondary border-bottom">{userToShow.nome}'s Reviews</h6>
            {reviews.content &&
              reviews.content.map((review) => {
                const libro = review.libro;
                return (
                  <Col key={review.id} className="profile-review-item mb-3 border-bottom pb-3 col-12">
                    <div className="d-flex profile-review-content review-info">
                      <p>
                        <Link to="/profile">
                          {userToShow.nome} {userToShow.cognome}
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
            <h6 className="border-secondary border-bottom">{userToShow.nome}'s Friends</h6>
            {isFriendsLoading ? (
              <Spinner animation="border" variant="primary" />
            ) : (
              friendsToShow.map((friend) => (
                <Col key={friend.id} className="col-3">
                  <Image src={friend.avatar} alt="Avatar" className="img-fluid" as={Link} to={`/profile/${friend.id}`} />
                  <p>
                    <Link to={`/profile/${friend.id}`}>
                      {friend.nome} {friend.cognome}
                    </Link>
                  </p>
                </Col>
              ))
            )}
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
