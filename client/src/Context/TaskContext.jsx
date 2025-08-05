import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext.jsx';

const TaskContext = createContext(null);

export const useTasks = () => {
    const ctx = useContext(TaskContext);
    if (!ctx) throw new Error('useTasks must be used inside a TaskProvider');
    return ctx;
};

export const TaskProvider = ({ children }) => {
    const { user } = useAuth();
    const email = user?.email;

    // load once, synchronously, so we don't save [] first
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem(`tasks_${email}`);
        return saved ? JSON.parse(saved) : [];
    });

    // when the email changes (user switches), reload that user's tasks
    const prevEmailRef = useRef(email);
    useEffect(() => {
        if (prevEmailRef.current !== email) {
            const saved = localStorage.getItem(`tasks_${email}`);
            setTasks(saved ? JSON.parse(saved) : []);
            prevEmailRef.current = email;
        }
    }, [email]);

    // save after tasks change (but only for the current email)
    useEffect(() => {
        localStorage.setItem(`tasks_${email}`, JSON.stringify(tasks));
    }, [tasks, email]);

    const addTask = (task) => setTasks(prev => [...prev, task]);

    const updateTask = (updatedTask) => {
        setTasks(prev => prev.map(t => (t.id === updatedTask.id ? updatedTask : t)));
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    const getTaskById = (id) => tasks.find(t => String(t.id) === String(id));

    return (
        <TaskContext.Provider value={{ tasks, setTasks, addTask, updateTask, deleteTask, getTaskById }}>
            {children}
        </TaskContext.Provider>
    );
};
