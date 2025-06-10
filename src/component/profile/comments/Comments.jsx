import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, getCommentByUser, getCurrentUser } from "../../../redux/actions";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ModalUpdateComment from "./ModalUpdateComment";
import "./Comments.css";

function Comments() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users?.content);
  const comments = useSelector((state) => state.comments?.commentsByUser);
  const [showModal, setShowModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setPage(0);
      setHasMore(true);
      dispatch(getCommentByUser(currentUser.id, 0, true));
    }
  }, [dispatch, currentUser]);

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(commentId)).then(() => {
      dispatch(getCommentByUser(currentUser.id, page, true));
    });
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    dispatch(getCommentByUser(currentUser.id, nextPage)).then((data) => {
      if (data?.last) setHasMore(false);
      setPage(nextPage);
    });
  };

  return (
    <Container className="my-posts-container">
      <h1>My Posts</h1>
      <Row>
        <Col className="col-9 my-posts-list">
          {comments &&
            comments?.content
              ?.slice()
              .sort((a, b) => new Date(b.dataCommento) - new Date(a.dataCommento))
              .map((comment) => {
                return (
                  <Row key={comment.id} className="post-item">
                    <Col>
                      <div className="post-author d-flex align-items-start mb-2">
                        <Link to={`/profile/${currentUser.id}`}>
                          <img src={currentUser.avatar} alt={currentUser.nome} className="me-2" />
                        </Link>
                        <div>
                          <div className="d-flex">
                            <Link to={`/profile/${currentUser.id}`} className="author-name">
                              <p className="mb-1 fw-semibold ">{currentUser ? `${currentUser.nome} ${currentUser.cognome}` : "Caricamento..."}</p>
                            </Link>
                            <p className="text-muted ms-5 post-date">{comment.dataCommento}</p>
                          </div>
                          <p className="mb-0 post-text">{comment.testo}</p>
                        </div>
                      </div>
                    </Col>
                    <Col className="post-actions">
                      <Button
                        onClick={() => {
                          setSelectedComment(comment);
                          setShowModal(true);
                        }}
                      >
                        Edit Comment
                      </Button>
                      <ModalUpdateComment show={showModal} onHide={() => setShowModal(false)} comment={selectedComment} utente={currentUser} backdrop={false} />
                      <Button onClick={() => handleDeleteComment(comment.id)}>Delete Comment</Button>
                    </Col>
                  </Row>
                );
              })}
          {hasMore && (
            <Button onClick={handleLoadMore} className="load-more-btn">
              Load more comments
            </Button>
          )}
        </Col>
        <Col className="col-3">
          <Link to={`/profile/${currentUser.id}`} className="back-link">
            Back to profile
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
export default Comments;
