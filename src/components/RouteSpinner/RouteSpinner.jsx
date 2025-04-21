// src/components/RouteSpinner.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const RouteSpinner = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 400); // fake delay
        return () => clearTimeout(timer);
    }, [location]);

    return loading ? (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white " style={{ zIndex: 9999 }}>
            <Spinner animation="border" variant="dark" />
        </div>
    ) : null;
};

export default RouteSpinner;
