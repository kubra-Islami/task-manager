// src/App.jsx
import { AppRoutes } from './AppRoutes.jsx';
import { TaskProvider } from "@/Context/TaskContext.jsx";
import { UserProvider } from "@/Context/UserContext.jsx";
import ThemeProvider from "@/Context/ThemeContext.jsx"; // 👈 Add this
import RouteSpinner from "@/components/RouteSpinner/RouteSpinner.jsx";

function App() {
    const isLoggedIn = true;

    return (
        <ThemeProvider> {/* 👈 Wrap everything */}
            <TaskProvider>
                <UserProvider>
                    <RouteSpinner />
                    <AppRoutes isLoggedIn={isLoggedIn} />
                </UserProvider>
            </TaskProvider>
       </ThemeProvider>
    );
}

export default App;
