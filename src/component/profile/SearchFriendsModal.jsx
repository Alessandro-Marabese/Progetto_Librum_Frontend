import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

function SearchFriendsModal({ show, onHide, utenti }) {
  console.log(utenti);
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Search Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {utenti &&
          utenti?.content?.map((user) => (
            <Link key={user.id} to={`/profile/${user.id}`} onClick={onHide}>
              <div className="d-flex align-items-center mb-2">
                <img src={user.avatar} alt={user.nome} style={{ width: 40, height: 40, borderRadius: "50%" }} />
                <div className="ms-2">
                  {user.nome} {user.cognome}
                </div>
              </div>
            </Link>
          ))}
      </Modal.Body>
    </Modal>
  );
}

export default SearchFriendsModal;
