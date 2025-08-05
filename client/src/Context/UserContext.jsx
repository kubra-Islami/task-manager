// import React, { createContext, useContext, useState, useEffect } from 'react';
//
// const UserContext = createContext();
//
// export const useUser = () => useContext(UserContext);
//
// export const UserProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//
//     useEffect(() => {
//         const storedUser = localStorage.getItem('user');
//         // console.log(storedUser);
//         if (storedUser) {
//             setUser(JSON.parse(storedUser));
//         }
//     }, []);
//
//     const logout = () => {
//         setUser(null);
//         localStorage.removeItem('user');
//     };
//
//     return (
//         <UserContext.Provider value={{ user, setUser, logout }}>
//             {children}
//         </UserContext.Provider>
//     );
// };
//


import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
