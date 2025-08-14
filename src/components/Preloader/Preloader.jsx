import React, { useEffect, useState } from 'react';
import "./preloader.css";

const Preloader = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const isPreloaderShown = localStorage.getItem('preloaderShown');
        if (!isPreloaderShown) {
            setTimeout(() => {
                setIsVisible(false);
                localStorage.setItem('preloaderShown', 'true');
            }, 2000); // Set the duration for how long the preloader stays visible
        } else {
            setIsVisible(false);
        }
    }, []);

    if (!isVisible) return null;

    return (
        <div id="preloader">
            <div className="loader_line"></div>
        </div>
    );
};

export default Preloader;
