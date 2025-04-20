import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Import the custom CSS file
const Sidebar = () => {
    return (
        <div className="sidebar d-flex flex-column p-3 bg-light shadow-sm">
            <h5 className="mb-4 fw-bold">✨ TaskMaster</h5>
            <Nav className="flex-column gap-2">
                <NavLink to="/" end className={({ isActive }) => `sidebar-link nav-link px-3 py-2 rounded ${isActive ? 'active-link' : ''}`}>
                    🏠 <span className="ms-2">Dashboard</span>
                </NavLink>

                <NavLink to="/tasks" className={({ isActive }) => `sidebar-link nav-link px-3 py-2 rounded ${isActive ? 'active-link' : ''}`}>
                    📋 <span className="ms-2">My Tasks</span>
                </NavLink>

                <NavLink to="/profile" className={({ isActive }) => `sidebar-link nav-link px-3 py-2 rounded ${isActive ? 'active-link' : ''}`}>
                    👤 <span className="ms-2">Profile</span>
                </NavLink>

                <NavLink to="/settings" className={({ isActive }) => `sidebar-link nav-link px-3 py-2 rounded ${isActive ? 'active-link' : ''}`}>
                    ⚙️ <span className="ms-2">Settings</span>
                </NavLink>
            </Nav>
        </div>
    );
};


export default Sidebar;
