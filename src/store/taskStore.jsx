import {create} from "zustand";

const validStatuses = ["todo", "in-progress", "done"];

export const useTaskStore =

    create((set) => ({
        tasks: [],

        addTask: (title, taskDescription) => set((state) => ({
            tasks: [...state.tasks, {id: Date.now(), title, taskDescription, status: 'todo'}]
        })),

        updateTask: (id, status) => set((state) => ({
            tasks: state.tasks.map(task =>
                task.id === id && validStatuses.includes(status) ? {...task, status} : task
            )
        })),
        deleteTask: (id) => set((state) => ({
            tasks: state.tasks.filter(task => task.id !== id)
        })),

        setTasks: (newTasks) =>
            set(() => ({
                tasks: newTasks,
            })),
    }));
