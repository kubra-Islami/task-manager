import React, { createContext, useState, useEffect } from 'react';

const TaskContext = createContext();
export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task) => {
        setTasks(prev => [...prev, task]);
    };

    const updateTask = (updatedTask) => {
        setTasks(prev => prev.map(task => task.id === updatedTask.id ? updatedTask : task));
    };

    const getTaskById = (id) => tasks.find(task => task.id === id);

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, getTaskById}}>
            {children}
        </TaskContext.Provider>
    );
};
