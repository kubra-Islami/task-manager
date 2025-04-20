// src/components/layout/Sidebar.jsx
import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="d-flex flex-column p-3 bg-body-secondary" style={{ width: '220px'}}>
            <Nav className="flex-column">
                <Nav.Link as={NavLink} to="/tasks">
                    📋 My Tasks
                </Nav.Link>
                <Nav.Link as={NavLink} to="/profile">
                    👤 Profile
                </Nav.Link>
                <Nav.Link as={NavLink} to="/settings">
                    ⚙️ Settings
                </Nav.Link>
            </Nav>
        </div>
    )
}

export default Sidebar
