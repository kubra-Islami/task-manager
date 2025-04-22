import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const RouteSpinner = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 400); // simulate loading
        return () => clearTimeout(timer);
    }, [location]);

    useEffect(() => {
        const currentTheme = document.body.dataset.theme;
        setIsDark(currentTheme === 'dark');
    }, [location]);

    return loading ? (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{
                zIndex: 9999,
                backgroundColor: isDark ? 'var(--card-bg)' : '#ffffff',
                transition: 'background-color 0.3s ease',
            }}
        >
            <Spinner animation="border" variant={isDark ? 'light' : 'dark'} />
        </div>
    ) : null;
};

export default RouteSpinner;
