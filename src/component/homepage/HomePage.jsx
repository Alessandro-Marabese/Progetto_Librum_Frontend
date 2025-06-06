import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, getFriendsByUser, getReviewsByUserHomepage, getUserBookByUser, getUserById } from "../../redux/actions";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

function HomePage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.content);
  const userBooks = useSelector((state) => state.userBook.content);
  const friends = useSelector((state) => state.friends.content);
  const reviews = useSelector((state) => state.reviews.reviewsByUsers);
  const usersReviewsById = useSelector((state) => state.users.userReviews || {});
  console.log(reviews);
  console.log(usersReviewsById);

  const currentlyReading = userBooks.filter((book) => book.statoLettura === "CURRENTLY_READING");
  const wantToRead = userBooks.filter((book) => book.statoLettura === "WANT_TO_READ");
  const readCount = userBooks.filter((book) => book.statoLettura === "READ").length;
  const allBooksCount = userBooks.length;

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(getUserBookByUser(currentUser.id));
      dispatch(getFriendsByUser(currentUser.id));
    }
  }, [dispatch, currentUser?.id]);

  useEffect(() => {
    if (friends && friends.length > 0) {
      friends.forEach((friend) => {
        dispatch(getReviewsByUserHomepage(friend.id));
      });
    }
  }, [dispatch, friends]);

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const userIds = [...new Set(reviews.map((r) => r.utenteId))];
      const missingUserIds = userIds.filter((id) => !usersReviewsById[id]);
      missingUserIds.forEach((userId) => {
        dispatch(getUserById(userId, "review"));
      });
    }
  }, [reviews, usersReviewsById, dispatch]);

  return (
    <Container>
      <Row>
        <Col className="col-4">
          {currentlyReading.length > 0 && (
            <Row className="border-bottom mt-3 pb-3">
              <h3>Currently Reading</h3>
              {currentlyReading.slice(0, 1).map((item) => (
                <Col key={item.libro.id}>
                  <div className="d-flex">
                    <div>
                      <Link to={`/libro/${encodeURIComponent(item.libro.id)}`}>
                        <img src={item.libro.coverUrl} alt={item.libro.titolo} className="img-fluid" />
                      </Link>
                    </div>
                    <div className="ms-2">
                      <Link to={`/libro/${encodeURIComponent(item.libro.id)}`}>
                        <h5>{item.libro.titolo}</h5>
                      </Link>
                      <Link to={`/autore/${item.libro.nomiAutori[0]}`}>
                        <h6>{item.libro.nomiAutori[0]}</h6>
                      </Link>
                    </div>
                  </div>
                  <div>
                    <Link to={`/mybooks`}>View All Books</Link>
                    <Link to={`/search`} className="ms-2">
                      Add a Book
                    </Link>
                  </div>
                </Col>
              ))}
            </Row>
          )}
          {wantToRead.length > 0 && (
            <Row className="border-bottom mt-3 pb-3">
              <h3>Want To Read</h3>
              {wantToRead.slice(0, 3).map((item) => (
                <Col key={item.libro.id} className="d-flex">
                  <div className="col-4">
                    <Link to={`/libro/${encodeURIComponent(item.libro.id)}`}>
                      <img src={item.libro.coverUrl} alt={item.libro.titolo} className="img-fluid" />
                    </Link>
                  </div>
                </Col>
              ))}
              <div>
                <Link to={`/mybooks`}>View All Books</Link>
                <Link to={`/search`} className="ms-2">
                  Add a Book
                </Link>
              </div>
            </Row>
          )}
          <Row>
            <Col className=" mt-3">
              <h3>My Bookshelves</h3>
              <ul className="mybooks-first-list">
                <li>
                  <Link to={`/mybooks`}>Want to Read</Link> ({wantToRead.length}){" "}
                </li>
                <li>
                  <Link to={`/mybooks`}>Currently Reading </Link>({currentlyReading.length})
                </li>
                <li>
                  <Link to={`/mybooks`}>Read </Link>({readCount})
                </li>
                <li>
                  <Link to={`/mybooks`}>All Books </Link>({allBooksCount})
                </li>
              </ul>
            </Col>
          </Row>
        </Col>
        <Col className="col-8">
          <h3>Updates from your friends</h3>
          {reviews.length > 0 &&
            reviews
              .sort((a, b) => new Date(b.dataCreazione) - new Date(a.dataCreazione))
              .map((review) => {
                const user = usersReviewsById[review.utenteId];
                return (
                  <Row key={review.id} className="border-bottom mt-3">
                    <Col className="col-3">
                      {user ? (
                        <>
                          <Link to={`/profile/${user.id}`}>
                            <img src={user.avatar} alt={user.nome} className="img-fluid" />
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
                    <Col className="col-4">
                      <p>{review.commento}</p>
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
                      <p>{review.dataCreazione}</p>
                    </Col>
                    <Col className="col-5 d-flex">
                      <div>
                        <Link to={`/libro/${encodeURIComponent(review.libro.libroId)}`}>
                          <img src={review.libro.coverUrl} alt={review.libro.titolo} className="img-fluid" style={{ width: "auto", height: "100px" }} />
                        </Link>
                      </div>
                      <div className="ms-2">
                        <Link to={`/libro/${encodeURIComponent(review.libro.libroId)}`}>
                          <p>{review.libro.titolo}</p>
                        </Link>
                        <Link to={`/autore/${review.libro.nomiAutori[0]}`}>
                          <p>{review.libro.nomiAutori[0]}</p>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                );
              })}
        </Col>
      </Row>
    </Container>
  );
}
export default HomePage;
