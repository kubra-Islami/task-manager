import React, { createContext, useContext, useState, useEffect } from 'react';


const useAuth = () => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : { email: "guest@example.com" };
};

const TaskContext = createContext();


// export const useTasks = () => useContext(TaskContext);
export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used inside a TaskProvider');
    }
    return context;
};

export const TaskProvider = ({ children }) => {

    const { email ,password } = useAuth();
    const [tasks, setTasks] = useState([]);

    // useEffect(() => {
    //     const saved = localStorage.getItem(`tasks_${email}`);
    //     setTasks(saved ? JSON.parse(saved) : []);
    // }, [email]);

    // useEffect(() => {
    //     const saved = localStorage.getItem(`tasks_${email}`);
    //     setTasks(saved ? JSON.parse(saved) : []);
    // }, [email]);


    useEffect(() => {
        const saved = localStorage.getItem(`tasks_${email}`);
        const parsed = saved ? JSON.parse(saved) : [];
        // Only update state if different
        setTasks(prev => {
            const prevStr = JSON.stringify(prev);
            const parsedStr = JSON.stringify(parsed);
            return prevStr !== parsedStr ? parsed : prev;
        });
    }, [email]);


    useEffect(() => {
        localStorage.setItem(`tasks_${email}`, JSON.stringify(tasks));
    }, [tasks,email]);

    const addTask = (task) => {
        setTasks((prev) => [...prev, task]);
    };

    const updateTask = (updatedTask) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === updatedTask.id ? updatedTask : task
            )
        );
    };
    const getTaskById = (id) => tasks.find((task) => task.id === id);

    return (
        <TaskContext.Provider value={{ tasks,setTasks, addTask, updateTask, getTaskById }}>
            {children}
        </TaskContext.Provider>
    );
};


// // src/context/TaskContext.jsx
// import { createContext, useContext, useEffect, useState } from "react";
// import { useAuth } from "./AuthContext"; // <- your user context or auth hook
//
// const TaskContext = createContext();
//
// export const TaskProvider = ({ children }) => {
//     const { user } = useAuth(); // Assume this provides current user (e.g., user.email)
//     const [tasks, setTasks] = useState([]);
//
//     // Load tasks from localStorage when user changes
//     useEffect(() => {
//         if (user?.email) {
//             const savedTasks = JSON.parse(localStorage.getItem(`tasks-${user.email}`)) || [];
//             setTasks(savedTasks);
//         } else {
//             setTasks([]); // If no user, clear tasks
//         }
//     }, [user]);
//
//     // Save tasks to localStorage when tasks change
//     useEffect(() => {
//         if (user?.email) {
//             localStorage.setItem(`tasks-${user.email}`, JSON.stringify(tasks));
//         }
//     }, [tasks, user]);
//
//     return (
//         <TaskContext.Provider value={{ tasks, setTasks }}>
//             {children}
//         </TaskContext.Provider>
//     );
// };

// export const useTasks = () => useContext(TaskContext);

