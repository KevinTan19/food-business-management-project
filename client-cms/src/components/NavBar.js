import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/actions/userActions";
export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line
  }, []);
  return (
    <Navbar bg="light" expand="lg">
      <Container className="mt-0 mb-0">
        <Navbar.Brand className="fw-bold">
          <Link to="/">Food's</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              {!localStorage.getItem("access_token") && (
                <Link to="/login">Login</Link>
              )}
            </Nav.Link>
            <Nav.Link>
              <Link to="/add">Add item</Link>
            </Nav.Link>
            <NavDropdown id="basic-nav-dropdown">
              {/* {categories.map((category) => {
                return (
                  <NavDropdown.Item key={category.id}>
                    {category.name}
                  </NavDropdown.Item>
                );
              })} */}
              {/* <NavDropdown.Divider /> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Container className="mt-0 mb-0 d-flex flex-row-reverse">
        {localStorage.getItem("access_token") && (
          <Button
            className="btn btn-secondary"
            onClick={(event) => {
              event.preventDefault();
              dispatch(logoutUser());
              navigate("/login");
            }}
          >
            Logout
          </Button>
        )}
      </Container>
    </Navbar>
  );
}
