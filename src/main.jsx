import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';
import Preloader from "@/components/Preloader/Preloader.jsx";
import {PreloaderProvider} from "@/Context/PreloaderContext.jsx";

const Root = () => {
    const [showPreloader, setShowPreloader] = useState(true);

    useEffect(() => {
        const isPreloaderShown = localStorage.getItem('preloaderShown');
        if (!isPreloaderShown) {
            const timer = setTimeout(() => {
                localStorage.setItem('preloaderShown', 'true');
                setShowPreloader(false);
            }, 2000);
            return () => clearTimeout(timer);
        } else {
            setShowPreloader(false);
            localStorage.removeItem('preloaderShown');
        }
    }, []);

    return (
        <PreloaderProvider isActive={showPreloader}>
            {showPreloader ? (
                <Preloader/>
            ) : (
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            )}
        </PreloaderProvider>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Root/>
    </React.StrictMode>
);
