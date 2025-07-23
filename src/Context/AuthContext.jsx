// import React, { createContext, useContext, useState } from "react";
//
// const AuthContext = createContext(null);
//
// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(() => localStorage.getItem("user"));
//
//     const login = (email,password) => {
//         setUser(email,password);
//         localStorage.setItem("user", email,password);
//     };
//
//     const logout = () => {
//         setUser(null);
//         localStorage.removeItem("user");
//     };
//
//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
//
// export const useAuth = () => useContext(AuthContext);
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // const [user, setUser] = useState(() => {
    //     const saved = localStorage.getItem("user");
    //     return saved ? JSON.parse(saved) : null;
    // });
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("user");
        try {
            return stored ? JSON.parse(stored) : null;
        } catch (err) {
            return null;
        }
    });

    const login = (email) => {
        const userData = { email }; // no password stored
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
