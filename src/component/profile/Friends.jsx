import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, getFriendsByUser, searchUsers } from "../../redux/actions";
import { Link } from "react-router-dom";
import SearchFriendsModal from "./SearchFriendsModal";

function Friends() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.content);
  const friends = useSelector((state) => state.friends.content);
  const searchedUsers = useSelector((state) => state.users.ricercaUtenti);
  const [modalShow, setModalShow] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!user?.id) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (user.id) {
      dispatch(getFriendsByUser(user.id));
    }
  }, [dispatch, user.id]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(searchUsers(query));
      setModalShow(true);
    }
  };

  return (
    <Container>
      <h1>Friends</h1>
      <Row>
        <Col className="col-9">
          <Row>
            {friends.map((friend) => (
              <Col className="col-3" key={friend.id}>
                <Link to={`/profile/${friend.id}`}>
                  <img src={friend.avatar} alt={friend.name} className="img-fluid" />
                </Link>
                <Link to={`/profile/${friend.id}`}>
                  <p>
                    {friend.nome} {friend.cognome}
                  </p>
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
        <Col className="col-3">
          <h4>Find new friends</h4>
          <div>
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
              <Button variant="outline-success" type="submit" onClick={() => setModalShow(true)}>
                <ion-icon name="search-outline"></ion-icon>
              </Button>
            </Form>
            <SearchFriendsModal show={modalShow} onHide={() => setModalShow(false)} utenti={searchedUsers} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Friends;
