import { useEffect, useState } from "react";
import { Button, Container, Dropdown, Form, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../redux/actions";
import Notifications from "./Notifications";
function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.content);
  const [title, setTitle] = useState("");
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (title.trim()) {
      navigate("/search", { state: { title: title.trim() } });
      setTitle("");
    } else {
      navigate("/search?");
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="w-75">
        <Navbar.Brand as={Link} to="/homepage">
          Librum
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="flex-grow-0">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/homepage">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/mybooks">
              My Books
            </Nav.Link>
            <NavDropdown title="Browse" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/search?">
                Explore
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/generi">
                All Genres
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Community" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Groups</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Discussions</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <div>
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Button variant="outline-success" type="submit">
              <ion-icon name="search-outline"></ion-icon>
            </Button>
          </Form>
        </div>
        <div className="d-flex">
          <Notifications utente={currentUser} />
          <a href="/friends">
            <ion-icon name="people-outline"></ion-icon>
          </a>

          <Dropdown align="end">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <ion-icon name="person-outline"></ion-icon>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <div className="text-muted">
                {currentUser.nome} {currentUser.cognome}
              </div>
              <Dropdown.Item as={Link} to={`/profile/${currentUser.id}`}>
                Profile
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/friends">
                Friends
              </Dropdown.Item>
              <Dropdown.Item eventKey="3">Groups</Dropdown.Item>
              <Dropdown.Item as={Link} to={"/comments"}>
                Comments
              </Dropdown.Item>
              <Dropdown.Item eventKey="3">Discussions</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4">Account Settings</Dropdown.Item>
              <Dropdown.Item as={Link} to={"/"}>
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
}
export default NavBar;
