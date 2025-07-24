import {AppRoutes} from './AppRoutes.jsx';
import {TaskProvider} from "@/Context/TaskContext.jsx";
import {UserProvider} from "@/Context/UserContext.jsx";
import ThemeProvider from "@/Context/ThemeContext.jsx";
import RouteSpinner from "@/components/RouteSpinner/RouteSpinner.jsx";
import {AuthProvider} from "@/Context/AuthContext.jsx";

function App() {
    const isLoggedIn = true;
    return (
        <AuthProvider>
            <TaskProvider>
                <ThemeProvider>
                    <UserProvider>
                        <RouteSpinner/>
                        <AppRoutes isLoggedIn={isLoggedIn}/>
                    </UserProvider>
                </ThemeProvider>
            </TaskProvider>
        </AuthProvider>

    );
}

export default App;
