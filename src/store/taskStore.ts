import {create} from "zustand/react";

interface Task {
    id: string;
    title: string;
    status: 'todo' | 'in-progress' | 'done';
}

interface TaskStore {
    tasks: Task[];
    addTask: (title: string) => void;
    updateTask: (id: string, status: Task['status']) => void;
    deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    addTask: (title) =>
        set((state) => ({
            tasks: [...state.tasks, {id: crypto.randomUUID(), title, status: 'todo'}]
        })),
    updateTask: (id, status) =>
        set((state) => ({
            tasks: state.tasks.map((task) => task.id !== id ? {...task, status} : task)
        })),
    deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
    }))
}));