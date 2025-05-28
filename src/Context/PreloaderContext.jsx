import React, { createContext, useContext } from 'react';

const PreloaderContext = createContext();

export const PreloaderProvider = ({ children, isActive }) => (
    <PreloaderContext.Provider value={{ isPreloaderActive: isActive }}>
        {children}
    </PreloaderContext.Provider>
);

export const usePreloader = () => {
    const context = useContext(PreloaderContext);
    if (!context) {
        throw new Error('usePreloader must be used within a PreloaderProvider');
    }
    return context;
};
