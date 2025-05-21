import { Col, Container, Row, Image } from "react-bootstrap";
import { getCurrentUser } from "../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const dispatch = useDispatch();
  const utente = useSelector((state) => state.users.content);
  console.log(utente);
  useEffect(() => {
    dispatch(getCurrentUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <Row className="mt-3">
        <Col className="col-9">
          <Row>
            <Col className="col-3">
              <Image src={utente.avatar} alt="Avatar" style={{ width: "50px", height: "50px" }} />
            </Col>
            <Col>
              <h3 className="border-secondary border-bottom">
                {utente.nome} {utente.cognome}
              </h3>

              <h4>Informations</h4>
              <p>Name: {utente.nome}</p>
              <p>Surname: {utente.cognome}</p>
              <p>Username: {utente.username}</p>
              <p>Email: {utente.email}</p>
            </Col>
          </Row>
          <Row className="justify-content-around">
            <h6 className="border-secondary border-bottom">{utente.nome}'s Bookshelves</h6>
            <Col>
              <a href="#">To read</a>
            </Col>
            <Col>
              <a href="#">Currently-reading</a>
            </Col>
            <Col>
              <a href="#">Read</a>
            </Col>
          </Row>
          <Row>
            <h6 className="border-secondary border-bottom">{utente.nome}'s Books Update</h6>
          </Row>
          <Row>
            <h6 className="border-secondary border-bottom">{utente.nome}'s Comments</h6>
          </Row>
        </Col>

        <Col className="col-3">
          <Row>
            <h6 className="border-secondary border-bottom">{utente.nome}'s Friends</h6>
          </Row>
          <Row>
            <h6 className="border-secondary border-bottom">Favorite Genres</h6>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
export default Profile;
