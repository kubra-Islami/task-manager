import {Routes, Route, Navigate, BrowserRouter} from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Welcome from "./pages/Welcome/Welcome.jsx";
import Profile from './pages/Profile/Profile.jsx';
import Tasks from './pages/Tasks/Tasks.jsx';
import TaskDetails from "./pages/TaskDetails/TaskDetails.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import {useAuth} from "./Context/AuthContext.jsx";
import EditProfile from "./pages/EditProfile/EditProfile.jsx";

export const AppRoutes = () => {
    const {user} = useAuth();

    if (!user) {
        return (
                <Routes>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="*" element={<Navigate to="/register" replace/>}/>
                </Routes>

        );
    }

    return (
            <Routes>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/tasks" element={<Tasks/>}/>
                <Route path="/tasks/:id" element={<TaskDetails/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/editprofile" element={<EditProfile/>}/>
                <Route path="*" element={<Navigate to="/welcome" replace/>}/>
            </Routes>
    );
};
