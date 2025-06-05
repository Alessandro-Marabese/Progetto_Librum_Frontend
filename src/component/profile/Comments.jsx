import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentByUser, getCurrentUser } from "../../redux/actions";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Comments() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users?.content);
  const comments = useSelector((state) => state.comments?.commentsByUser);
  console.log(currentUser);
  console.log(comments);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      dispatch(getCommentByUser(currentUser.id));
    }
  }, [dispatch, currentUser]);

  return (
    <Container>
      <h1>My Posts</h1>
      <Row>
        <Col className="col-9">
          {comments &&
            comments?.content?.map((comment) => {
              return (
                <Row key={comment.id}>
                  <div className="d-flex align-items-start mb-2">
                    <Link to={`/profile/${currentUser.id}`}>
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.nome}
                        className="rounded-circle me-2"
                        style={{ width: "32px", height: "32px", objectFit: "cover" }}
                      />
                    </Link>
                    <div>
                      <Link to={`/profile/${currentUser.id}`}>
                        <p className="mb-1 fw-semibold">{currentUser ? `${currentUser.nome} ${currentUser.cognome}` : "Caricamento..."}</p>
                      </Link>
                      <p className="mb-0">{comment.testo}</p>
                      <p className="text-muted" style={{ fontSize: "12px" }}>
                        {comment.dataCommento}
                      </p>
                    </div>
                  </div>
                </Row>
              );
            })}
        </Col>
        <Col className="col-3">
          <Link to={`/profile/${currentUser.id}`}>Back to profile</Link>
        </Col>
      </Row>
    </Container>
  );
}
export default Comments;
