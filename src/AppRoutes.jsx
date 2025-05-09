import {Routes, Route, Navigate, Router} from 'react-router-dom'
// import Login from './pages/Auth/Login'
// import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import Welcome from "@/pages/Welcome/Welcome";
import Profile from './pages/Profile/Profile'
import Settings from './pages/Settings/Settings'
import Tasks from './pages/Tasks/Tasks';
import TaskDetails from "@/pages/TaskDetails/TaskDetails";

export const AppRoutes = ({isLoggedIn}) => {
    if (!isLoggedIn) {
        return (
            <Routes>
                {/*<Route path="/login" element={<Login />} />*/}
                {/*<Route path="/register" element={<Register />} />*/}
                {/*<Route path="*" element={<Navigate to="/login" replace />} />*/}
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/welcome" element={<Welcome/>}/>
            <Route path="/tasks" element={<Tasks/>}/>
            {/*<Route path="/edit/:id" element={<TaskForm />} />*/}
            <Route path="/tasks/:id" element={<TaskDetails/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="*" element={<Navigate to="/welcome" replace/>}/>
        </Routes>
    )
}
