import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './RouteSpinner.css'; // your spin classes

const RouteSpinner = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        // Fake loading delay
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 800); // customize duration

        return () => clearTimeout(timeout);
    }, [location]);

    return (
        loading && (
            <div className="d-flex justify-content-center align-items-center py-3">
                <div className="spin" />
            </div>
        )
    );
};

