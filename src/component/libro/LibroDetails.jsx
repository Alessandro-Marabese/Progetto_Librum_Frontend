import { useEffect, useMemo, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAuthorByName, getBookById, getCommentByReview, getCurrentUser, getReviewsByBook, getUserById, addComment } from "../../redux/actions";
import { Link } from "react-router-dom";
import WantToReadModal from "./WantToReadModal";
import ReviewModal from "./ReviewModal";
import "./LibroDetails.css";

function LibroDetails() {
  const dispatch = useDispatch();
  const { libroId } = useParams();
  const rawBook = useSelector((state) => state.books?.content);
  const [modalShow, setModalShow] = useState(false);
  const [modalReviewShow, setModalReviewShow] = useState(false);

  const book = useMemo(() => rawBook || {}, [rawBook]);
  const author = useSelector((state) => state.authors?.content) || [];
  const currentUser = useSelector((state) => state.users?.content);
  const reviewsState = useSelector((state) => state.reviews);
  const reviews = useMemo(() => reviewsState?.content?.content || [], [reviewsState]);
  const myReview = reviews.find((r) => r.utenteId === currentUser?.id);
  const usersReviewsById = useSelector((state) => state.users.userReviews || {});
  const usersCommentsById = useSelector((state) => state.users.userComments || {});
  const commentsByReview = useSelector((state) => state.comments.commentsByReview || {});
  const isLoadingByReview = useSelector((state) => state.comments.isLoadingByReview || {});
  const [activeReviewIds, setActiveReviewIds] = useState([]);
  const [commentText, setCommentText] = useState("");

  const toggleComments = (reviewId) => {
    if (!activeReviewIds.includes(reviewId)) {
      dispatch(getCommentByReview(reviewId));
      setActiveReviewIds((prev) => [...prev, reviewId]);
    } else {
      setActiveReviewIds((prev) => prev.filter((id) => id !== reviewId));
    }
  };

  const refreshReviews = () => {
    dispatch(getReviewsByBook(libroId));
  };

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getBookById(libroId));
    dispatch(getReviewsByBook(libroId));
  }, [dispatch, libroId]);

  useEffect(() => {
    if (book?.nomiAutori?.length > 0) {
      dispatch(getAuthorByName(book.nomiAutori[0]));
    }
  }, [dispatch, book]);

  useEffect(() => {
    if (reviews.length > 0) {
      const userIds = [...new Set(reviews.map((r) => r.utenteId))];
      const missingUserIds = userIds.filter((id) => !usersReviewsById[id]);
      missingUserIds.forEach((userId) => {
        dispatch(getUserById(userId, "review"));
      });
    }
  }, [dispatch, reviews, usersReviewsById]);

  useEffect(() => {
    const allComments = Object.values(commentsByReview).flatMap((reviewComments) => reviewComments.content || []);
    const uniqueUserIds = [...new Set(allComments.map((c) => c.utenteId))];
    const missingIds = uniqueUserIds.filter((id) => !usersCommentsById[id]);
    missingIds.forEach((id) => {
      dispatch(getUserById(id, "comment"));
    });
  }, [commentsByReview, dispatch, usersCommentsById]);

  const handleAddComment = async (e, reviewId) => {
    e.preventDefault();
    if (commentText.trim()) {
      await dispatch(addComment(commentText, currentUser.id, reviewId));
      await dispatch(getCommentByReview(reviewId));
      setCommentText("");
    }
  };

  return (
    <Container className="bookdetail-container">
      <Row className="bookdetail-row">
        <Col className="bookdetail-cover-col col-3">
          <img src={book.coverUrl} alt={book.titolo} className="img-fluid" />
          <Button onClick={() => setModalShow(true)}>Want to Read</Button>
          <WantToReadModal show={modalShow} onHide={() => setModalShow(false)} book={book} currentUser={currentUser} />
        </Col>
        <Col className="bookdetail-content-col col-9">
          <h1>{book.titolo}</h1>
          <h3>
            <Link to={`/autore/${book.nomiAutori?.[0]}`}>{book.nomiAutori?.[0] || "Autore sconosciuto"}</Link>
          </h3>
          <p>{book.descrizione}</p>
          <div className="genres-links d-flex">
            {book.nomiGeneri &&
              book.nomiGeneri.map((genere) => (
                <Link to={`/generi/${genere}`} key={genere} className="me-2">
                  {genere}
                </Link>
              ))}
          </div>
          <p className="section-divider border-bottom">First published in {book.primoAnnoPubblicazione}</p>
          <div className="author-section">
            <h2>About the Author</h2>
            {author ? (
              <Row className="author-info-row">
                <Col className="col-3 author-photo-col">
                  {author.photoUrl ? (
                    <img src={author.photoUrl} alt={author.name} className="img-fluid" />
                  ) : (
                    <div className="no-photo">Nessuna immagine disponibile per questo autore</div>
                  )}
                </Col>
                <Col className="col-9 author-bio-col">
                  <h3>
                    <Link to={`/autore/${book.nomiAutori?.[0]}`}>{book.nomiAutori?.[0] || "Autore sconosciuto"}</Link>
                  </h3>
                </Col>
                {author.bio ? <p>{author.bio}</p> : <p>Biografia non disponibile per questo autore.</p>}
              </Row>
            ) : (
              <Placeholder as="p" animation="glow">
                <Placeholder xs={6} /> <Placeholder xs={4} /> <Placeholder xs={4} /> <Placeholder xs={6} /> <Placeholder xs={8} />
              </Placeholder>
            )}
          </div>
          <Row className="review-section">
            <h2>Rating and Reviews</h2>
            <Col>
              <h3>My Reviews</h3>

              {myReview ? (
                <Row className="my-review-row">
                  <Col className="my-review-user-col col-3">
                    {currentUser ? (
                      <>
                        <Link to={`/profile/${currentUser.id}`}>
                          <img src={currentUser.avatar} alt={currentUser.username} className="img-fluid rounded-circle" />
                        </Link>
                      </>
                    ) : (
                      <Spinner animation="border" />
                    )}
                  </Col>
                  <Col className="col-9 my-review-content-col">
                    <p>{myReview.commento}</p>
                    <div>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <ion-icon
                          key={num}
                          name={myReview.rating >= num ? "star" : "star-outline"}
                          style={{
                            cursor: "default",
                            fontSize: "20px",
                            color: "#ffc107",
                            marginRight: "3px",
                          }}
                        />
                      ))}
                    </div>
                    <p>{myReview.dataCreazione}</p>
                    <Button onClick={() => setModalReviewShow(true)}>Edit Review</Button>
                    <ReviewModal
                      show={modalReviewShow}
                      onHide={() => setModalReviewShow(false)}
                      book={book}
                      currentUser={currentUser}
                      reviewToEdit={myReview}
                      onUpdate={refreshReviews}
                    />
                  </Col>
                </Row>
              ) : (
                <>
                  <h4>What do you think?</h4>
                  <Button onClick={() => setModalReviewShow(true)}>Write a review</Button>
                  <ReviewModal
                    show={modalReviewShow}
                    onHide={() => setModalReviewShow(false)}
                    book={book}
                    currentUser={currentUser}
                    onUpdate={refreshReviews}
                  />
                </>
              )}
            </Col>
          </Row>
          <h3>Community Reviews</h3>
          {reviews.map((review) => {
            const user = usersReviewsById[review.utenteId];
            return (
              <Row key={review.id} className="community-review-row">
                <Col className="community-review-user-col col-3">
                  {user ? (
                    <>
                      <Link to={`/profile/${user.id}`}>
                        <img src={user.avatar} alt={user.nome} className="img-fluid rounded-circle" />
                      </Link>
                      <p>
                        <Link to={`/profile/${user.id}`}>
                          {user.nome} {user.cognome}
                        </Link>
                      </p>
                    </>
                  ) : (
                    <Spinner animation="border" />
                  )}
                </Col>
                <Col className="community-review-content-col col-9">
                  <p>{review.commento}</p>
                  <div>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <ion-icon
                        key={num}
                        name={review.rating >= num ? "star" : "star-outline"}
                        style={{
                          cursor: "default", // niente puntatore perché è solo visuale
                          fontSize: "20px",
                          color: "#ffc107",
                          marginRight: "3px",
                        }}
                      ></ion-icon>
                    ))}
                  </div>
                  <p>{review.dataCreazione}</p>
                  <Button onClick={() => toggleComments(review.id)}>{activeReviewIds.includes(review.id) ? "Hide Comments" : "Show Comments"}</Button>
                  {activeReviewIds.includes(review.id) && (
                    <div className="comment-section">
                      {isLoadingByReview[review.id] ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        <>
                          {(commentsByReview[review.id] || []).content.map((comment) => {
                            const userComment = usersCommentsById[comment.utenteId];
                            return (
                              <div key={comment.id} className="comment-item">
                                {userComment ? (
                                  <Link to={`/profile/${userComment.id}`}>
                                    <img src={userComment.avatar} alt={userComment.nome} className="rounded-circle" />
                                  </Link>
                                ) : (
                                  <Spinner animation="border" size="sm" className="me-2" />
                                )}
                                <div>
                                  {userComment ? (
                                    <Link to={`/profile/${userComment.id}`}>
                                      <p className="mb-1 fw-semibold">{userComment ? `${userComment.nome} ${userComment.cognome}` : "Caricamento..."}</p>
                                    </Link>
                                  ) : (
                                    <p className="mb-1 fw-semibold">Caricamento...</p>
                                  )}
                                  <p className="mb-0">{comment.testo}</p>
                                  <p className="text-muted" style={{ fontSize: "12px" }}>
                                    {comment.dataCommento}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      )}
                      <div>
                        <Form className="comment-form d-flex mt-2" onSubmit={(e) => handleAddComment(e, review.id)}>
                          <Form.Control placeholder="Add Comment" className="me-2" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                          <Button variant="outline-success" type="submit">
                            Add new comment
                          </Button>
                        </Form>
                      </div>
                    </div>
                  )}
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
}
export default LibroDetails;
