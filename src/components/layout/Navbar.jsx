// src/components/layout/Navbar.jsx
import {Navbar, Container, Nav, Button} from 'react-bootstrap'
import {useUser} from "@/Context/UserContext.jsx";
import {useTheme} from "@/Context/ThemeContext.jsx";

const CustomNavbar = () => {
    const {user} = useUser();
    const { theme, toggleTheme } = useTheme();

    return (
        <Navbar className="theme-bg px-3 py-2" expand="lg">
        <Container fluid>
                <Navbar.Brand className='theme-text'>📝 TaskFlow</Navbar.Brand>
                <Nav className="ms-auto d-flex align-items-center" style={{flexWrap: 'nowrap'}}>
                    <div className="d-flex align-items-center gap-2 flex-nowrap" style={{whiteSpace: 'nowrap'}}>
                        <span className="me-3 d-none d-sm-inline-block "
                              style={{maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                             Hello, {user.name}
                        </span>
                        <img
                            src="src/assets/avatar.jpg"
                            alt="Avatar"
                            style={{width: '40px', height: '40px', borderRadius: '50%'}}
                            className="me-2"
                        />
                        <div className="theme-toggle" onClick={toggleTheme} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && toggleTheme()}>
                            <div className={`toggle-thumb ${theme === 'dark' ? 'dark' : 'light'}`}>
                                {theme === 'light' ? '🌞' : '🌙'}
                            </div>
                        </div>
                    </div>
                </Nav>

            </Container>
        </Navbar>
    )
}

export default CustomNavbar;

