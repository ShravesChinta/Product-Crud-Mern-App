import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link as RouterLink } from 'react-router-dom'

const NavigationBar = () => {
  return (
    <Navbar bg="white" expand="lg" className="border-bottom">
      <Container>
        <Navbar.Brand as={RouterLink} to="/" className="text-primary fw-bold">
          Product Manager
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={RouterLink} to="/" className="me-3">
              Products
            </Nav.Link>
            <Nav.Link as={RouterLink} to="/add" className="btn btn-primary">
              Add Product
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar 