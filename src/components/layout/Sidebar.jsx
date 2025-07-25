import {Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import './Sidebar.css';
import {useTheme} from "@/Context/ThemeContext.jsx"; // Import the custom CSS file
const Sidebar = () => {
    const {theme} = useTheme();

    return (
        // <div className="sidebar d-flex flex-column p-3 bg-light shadow-sm w-100" >
        <div className={`sidebar sidebar-wrapper d-flex flex-column p-3 shadow-sm w-100 ${theme}-theme`}
             style={{backgroundColor: 'var(--card-bg)', color: 'var(--text-color)'}}>
            <h5 className="mb-4 fw-bold ps-2">✨ Task Manager</h5>
            <Nav className="flex-column gap-2">
                <NavLink to="/" end
                         className={({isActive}) => `sidebar-link nav-link px-3 py-2 rounded ${isActive ? 'active-link' : ''}`}>
                    🏠 <span className="ms-2">Dashboard</span>
                </NavLink>

                <NavLink to="/tasks"
                         className={({isActive}) => `sidebar-link nav-link px-3 py-2 rounded ${isActive ? 'active-link' : ''}`}>
                    📋 <span className="ms-2">My Tasks</span>
                </NavLink>

                <NavLink to="/profile"
                         className={({isActive}) => `sidebar-link nav-link px-3 py-2 rounded ${isActive ? 'active-link' : ''}`}>
                    👤 <span className="ms-2">Profile</span>
                </NavLink>
            </Nav>
        </div>
    );
};


export default Sidebar;
