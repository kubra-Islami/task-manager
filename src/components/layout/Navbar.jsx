// Navigation for the app

// src/components/layout/Navbar.jsx
import {Navbar, Container, Nav} from 'react-bootstrap'
import {useUser} from "@/Context/UserContext.jsx";

const CustomNavbar = () => {
    const {user} = useUser();

    return (
        <Navbar className="px-3 py-2" bg="light" variant="light" expand="lg">
            <Container fluid>
                <Navbar.Brand >📝 TaskFlow</Navbar.Brand>
                <Nav className="ms-auto d-flex align-items-center" style={{flexWrap: 'nowrap'}}>
                    <div className="d-flex align-items-center gap-2 flex-nowrap" style={{whiteSpace: 'nowrap'}}>
                        <span className="me-3 d-none d-sm-inline-block"
                              style={{maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                             Hello, {user.name}
                        </span>
                        <img
                            src="src/assets/avatar.jpg"
                            alt="Avatar"
                            style={{width: '40px', height: '40px', borderRadius: '50%'}}
                        />
                    </div>
                </Nav>

            </Container>
        </Navbar>
    )
}

export default CustomNavbar

