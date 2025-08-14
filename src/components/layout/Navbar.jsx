import {Navbar, Container, Nav} from 'react-bootstrap';
import {useUser} from '../../Context/UserContext.jsx';
import {useTheme} from '../../Context/ThemeContext.jsx';
import user_image from "../../assets/user.jpg";

const CustomNavbar = () => {
    const {user} = useUser();
    const {theme, toggleTheme} = useTheme();

    const avatarSrc =`http://localhost:5000${user?.avatar || user_image}`;

    return (
        <Navbar className="theme-bg px-3 py-2 navbar" expand="lg">
            <Container fluid>
                <Navbar.Brand className="theme-text fs-4">📝 TaskFlow</Navbar.Brand>

                <Nav className="ms-auto d-flex align-items-center">
                    <div
                        className="d-flex align-items-center gap-3"
                        style={{whiteSpace: 'nowrap'}}
                    >
            <span
                className="d-none d-sm-inline-block text-truncate"
                style={{maxWidth: '200px'}}
            >
              👋 Hello, {user?.name || 'Guest'}
            </span>

                        <img
                            src={avatarSrc}
                            alt="User Avatar"
                            className="shadow-sm"
                            style={{
                                width: '40px',
                                height: '40px',
                                objectFit: 'cover',
                                borderRadius: '50%',
                                border: '2px solid #ddd',
                            }}
                        />

                        <div
                            className="theme-toggle px-2"
                            onClick={toggleTheme}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && toggleTheme()}
                            style={{
                                cursor: 'pointer',
                                fontSize: '1.3rem',
                            }}
                        >
                            {theme === 'light' ? '🌞' : '🌙'}
                        </div>
                    </div>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
