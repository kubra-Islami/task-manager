import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Welcome from "@/pages/Welcome/Welcome";
import Profile from './pages/Profile/Profile';
import Settings from './pages/Settings/Settings';
import Tasks from './pages/Tasks/Tasks';
import TaskDetails from "@/pages/TaskDetails/TaskDetails";
import Login from "@/pages/Auth/Login.jsx";
import Register from "@/pages/Auth/Register.jsx";
import { useAuth } from "./context/AuthContext";
import {TaskProvider} from "@/Context/TaskContext.jsx";

export const AppRoutes = () => {
    const { user } = useAuth();

    if (!user) {
        return (
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/register" replace />} />
            </Routes>
        );
    }

    return (
        <TaskProvider>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/tasks/:id" element={<TaskDetails />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/welcome" replace />} />
            </Routes>
        </TaskProvider>

    );
};
