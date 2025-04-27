// src/App.jsx
import { AppRoutes } from './AppRoutes.jsx';
import { TaskProvider } from "@/Context/TaskContext.jsx";
import { UserProvider } from "@/Context/UserContext.jsx";
import ThemeProvider from "@/Context/ThemeContext.jsx";
import RouteSpinner from "@/components/RouteSpinner/RouteSpinner.jsx";
import {useEffect} from "react";

function App() {
    const isLoggedIn = true;
    useEffect(() => {
        // وقتی اپ کامل لود شد
        const preloader = document.getElementById('preloader');
        if (preloader) {
            // یکم صبر کن بعد محو یا حذفش کن
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                preloader.style.display = 'none'; // یا مستقیم حذفش کن
                // preloader.remove(); // اگه بخوای کامل حذف شه
            }, 2000); // مثلا بعد از ۲ ثانیه
        }
    }, []);
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
