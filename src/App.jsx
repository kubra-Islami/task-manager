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
            <ThemeProvider>
                <TaskProvider>
                    <UserProvider>
                        <RouteSpinner/>
                        <AppRoutes isLoggedIn={isLoggedIn}/>
                    </UserProvider>
                </TaskProvider>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
