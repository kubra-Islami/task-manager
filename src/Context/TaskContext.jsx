// src/context/TaskContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

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
