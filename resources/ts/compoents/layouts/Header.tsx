import {
  Container,
  NavDropdown,
  Nav,
  Navbar,
  Dropdown,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { useAuth } from "../../features/auth/providers/AuthProvider";
import { PersonCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export default function Header(): JSX.Element {
  const { user, logIn, logOut } = useAuth();

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Sample Product Catalog Admin</Navbar.Brand>
          {user && (
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                Link
              </Nav.Link>
              <Dropdown>
                <Dropdown.Toggle
                  variant="dark"
                  className="d-flex align-items-center gap-2"
                >
                  <PersonCircle />
                  {user?.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item as="button" onClick={logOut}>
                    LogOut
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          )}
        </Container>
      </Navbar>
    </>
  );
}
