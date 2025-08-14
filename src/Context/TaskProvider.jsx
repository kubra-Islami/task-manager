import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

// Auth function (reads once)
const useAuth = () => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : { email: "guest@example.com" };
};

export const TaskProvider = ({ children }) => {
    const [user, setUser] = React.useState(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : { email: "guest@example.com" };
    });

    // useMemo to prevent `useAuth()` from being re-run on every render
    // const user = useMemo(() => useAuth(), []);
    const email = user.email;

    const [tasks, setTasks] = useState([]);

    // Load tasks once when `email` changes
    useEffect(() => {
        const saved = localStorage.getItem(`tasks_${email}`);
        setTasks(saved ? JSON.parse(saved) : []);
    }, [email]);

    // Save tasks whenever they change
    useEffect(() => {
        localStorage.setItem(`tasks_${email}`, JSON.stringify(tasks));
    }, [tasks, email]);

    const addTask = (task) => {
        setTasks((prev) => [...prev, task]);
    };

    const updateTask = (updatedTask) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
            )
        );
    };

    const getTaskById = (id) => tasks.find((task) => task.id === id);

    return (
        <TaskContext.Provider value={{ tasks, setTasks, addTask, updateTask, getTaskById }}>
            {children}
        </TaskContext.Provider>
    );
};
