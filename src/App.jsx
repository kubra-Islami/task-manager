import {AppRoutes} from './AppRoutes.jsx'
import {TaskProvider} from "@/Context/TaskContext.jsx";
import {UserProvider} from "@/Context/UserContext.jsx";


function App() {
    const isLoggedIn = true // Your logic here

    return (
        <UserProvider>
            <TaskProvider>
                <AppRoutes isLoggedIn={isLoggedIn}/>
            </TaskProvider>
        </UserProvider>
    )
}

export default App
