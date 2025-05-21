import { Button, Container, Dropdown, Form, Nav, NavDropdown, Navbar } from "react-bootstrap";
function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="w-75">
        <Navbar.Brand href="#home">Librum</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="flex-grow-0">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">My Books</Nav.Link>
            <NavDropdown title="Browse" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Explore</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">All Genres</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Recommendations</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Community" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Groups</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Discussions</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <div>
          <Form className="d-flex">
            <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
            <Button variant="outline-success">
              <ion-icon name="search-outline"></ion-icon>
            </Button>
          </Form>
        </div>
        <div className="d-flex">
          <Dropdown align="end">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <ion-icon name="notifications-outline"></ion-icon>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <div className="text-muted">No notifications</div>
            </Dropdown.Menu>
          </Dropdown>
          <a href="#">
            <ion-icon name="chatbubbles-outline"></ion-icon>
          </a>
          <a href="#">
            <ion-icon name="mail-outline"></ion-icon>
          </a>
          <a href="#">
            <ion-icon name="people-outline"></ion-icon>
          </a>

          <Dropdown align="end">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <ion-icon name="person-outline"></ion-icon>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <div className="text-muted">Nome Cognome</div>
              <Dropdown.Item href="/profile">Profile</Dropdown.Item>
              <Dropdown.Item eventKey="2">Friends</Dropdown.Item>
              <Dropdown.Item eventKey="3">Groups</Dropdown.Item>
              <Dropdown.Item eventKey="3">Comments</Dropdown.Item>
              <Dropdown.Item eventKey="3">Discussions</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4">Account Settings</Dropdown.Item>
              <Dropdown.Item eventKey="4">Log Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
}
export default NavBar;
