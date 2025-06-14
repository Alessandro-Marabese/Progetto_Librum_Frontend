import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { acceptFriendRequest, getFriendsRequest, rejectFriendRequest } from "../../redux/actions";
import { Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function Notifications({ utente }) {
  const dispatch = useDispatch();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        if (!utente?.id) return;
        const data = await dispatch(getFriendsRequest(utente.id, "PENDENTE"));
        setRequests(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Errore nel recupero delle richieste di amicizia:", error);
      }
    };

    fetchRequests();
  }, [dispatch, utente]);

  console.log(requests);

  const handleAccept = (requestId) => {
    dispatch(acceptFriendRequest(requestId));
    setRequests((prev) => prev.filter((req) => req.id !== requestId));
  };

  const handleDecline = (requestId) => {
    dispatch(rejectFriendRequest(requestId));
    setRequests((prev) => prev.filter((req) => req.id !== requestId));
  };

  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <ion-icon name="notifications-outline"></ion-icon>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {requests.length === 0 ? (
          <div className="text-muted">No notifications</div>
        ) : (
          requests.map((req) => (
            <div key={req.id} className="p-2">
              <Link to={`/profile/${req.senderId}`} className="notification-link">
                <p>{req.senderName} sent you a friend request</p>
              </Link>
              <Button onClick={() => handleAccept(req.id)} variant="success" size="sm" className="me-2">
                Accetta
              </Button>
              <Button onClick={() => handleDecline(req.id)} variant="danger" size="sm">
                Rifiuta
              </Button>
            </div>
          ))
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
export default Notifications;
