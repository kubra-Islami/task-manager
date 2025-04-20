// Navigation for the app

// src/components/layout/Navbar.jsx
import { Navbar, Container, Nav } from 'react-bootstrap'

const CustomNavbar = () => {
    return (
        <Navbar className="px-3 py-2" bg="light" variant="light" expand="lg">
            <Container fluid >
                <Navbar.Brand href="/">📝 TaskFlow</Navbar.Brand>
                <Nav className="ms-auto d-flex align-items-center">
                    <span className="me-3">Hello, Kubra</span>
                    <img
                        src="src/assets/avatar.jpg"
                        alt="Avatar"
                        style={{ width: '45px', height: '45px', borderRadius: '50%' }}
                    />
                </Nav>
            </Container>
        </Navbar>
    )
}

export default CustomNavbar

