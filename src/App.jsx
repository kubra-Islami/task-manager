import {AppRoutes} from './AppRoutes.jsx'
import {TaskProvider} from "@/Context/TaskContext.jsx";
import {UserProvider} from "@/Context/UserContext.jsx";
import RouteSpinner from "@/components/RouteSpinner/RouteSpinner.jsx";


function App() {
    const isLoggedIn = true // Your logic here

    return (
        <TaskProvider>
            <UserProvider>
                <RouteSpinner /> {/* 👈 Show spinner on route change */}
                <AppRoutes isLoggedIn={isLoggedIn}/>
            </UserProvider>
        </TaskProvider>
    )
}

export default App
