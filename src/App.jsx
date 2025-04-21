import {AppRoutes} from './AppRoutes.jsx'
import {TaskProvider} from "@/Context/TaskContext.jsx";
import {UserProvider} from "@/Context/UserContext.jsx";


function App() {
    const isLoggedIn = true // Your logic here

    return (
        <TaskProvider>
            <UserProvider>
                <AppRoutes isLoggedIn={isLoggedIn}/>
            </UserProvider>
        </TaskProvider>
    )
}

export default App
