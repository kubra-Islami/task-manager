// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import Spinner from 'react-bootstrap/Spinner';
// import { useTheme } from '@/Context/ThemeContext.jsx'; // 👈 Use context
//
// const RouteSpinner = () => {
//     const location = useLocation();
//     const [loading, setLoading] = useState(false);
//     const { theme } = useTheme(); // 👈 get live theme state
//
//     useEffect(() => {
//         setLoading(true);
//         const timer = setTimeout(() => setLoading(false), 400); // simulate loading
//         return () => clearTimeout(timer);
//     }, [location]);
//
//     return loading ? (
//         <div
//             className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center route-spinner"
//             style={{
//                 zIndex: 9999,
//                 backgroundColor: theme === 'dark' ? 'var(--card-bg)' : '#ffffff',
//                 transition: 'background-color 0.3s ease',
//             }}
//         >
//             <Spinner animation="border" variant={theme === 'dark' ? 'light' : 'dark'} />
//         </div>
//     ) : null;
// };
//
// export default RouteSpinner;
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { useTheme } from '../../Context/ThemeContext.jsx';
import { usePreloader } from '../../Context/PreloaderContext.jsx';

const RouteSpinner = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const { theme } = useTheme();
    const { isPreloaderActive } = usePreloader();

    useEffect(() => {
        if (!isPreloaderActive) {
            setLoading(true);
            const timer = setTimeout(() => setLoading(false), 400);
            return () => clearTimeout(timer);
        }
    }, [location, isPreloaderActive]);

    if (isPreloaderActive || !loading) return null;

    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center route-spinner"
            style={{
                zIndex: 9999,
                backgroundColor: theme === 'dark' ? 'var(--card-bg)' : '#ffffff',
                transition: 'background-color 0.3s ease',
            }}
        >
            <Spinner animation="border" variant={theme === 'dark' ? 'light' : 'dark'} />
        </div>
    );
};

export default RouteSpinner;
