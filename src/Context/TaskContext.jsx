import React, {createContext, useContext, useState, useEffect} from 'react';


const useAuth = () => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : {email: "guest@example.com"};
};

const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used inside a TaskProvider');
    }
    return context;
};

export const TaskProvider = ({children}) => {
    const {email} = useAuth();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem(`tasks_${email}`);
        const parsed = saved ? JSON.parse(saved) : [];
        setTasks(parsed);
    }, [email]);

    useEffect(() => {
        localStorage.setItem(`tasks_${email}`, JSON.stringify(tasks));
    }, [tasks, email]);


    const addTask = (task) => setTasks((prev) => [...prev, task]);

    const updateTask = (updatedTask) => {
        setTasks(prevTasks =>
            prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task)
        );
    };

    const getTaskById = (id) => tasks.find((task) => task.id === id);

    return (
        <TaskContext.Provider value={{tasks, setTasks, addTask, updateTask, getTaskById}}>
            {children}
        </TaskContext.Provider>
    );
};

// export const TaskProvider = ({ children }) => {
//
//     const { email } = useAuth();
//     const [tasks, setTasks] = useState([]);
//
//     useEffect(() => {
//         const saved = localStorage.getItem(`tasks_${email}`);
//         const parsed = saved ? JSON.parse(saved) : [];
//         // Only update state if different
//         setTasks(prev => {
//             const prevStr = JSON.stringify(prev);
//             const parsedStr = JSON.stringify(parsed);
//             return prevStr !== parsedStr ? parsed : prev;
//         });
//     }, [email]);
//
//
//     useEffect(() => {
//         localStorage.setItem(`tasks_${email}`, JSON.stringify(tasks));
//     }, [tasks,email]);
//
//     const addTask = (task) => {
//         // localStorage.setItem(`tasks_${email}`, JSON.stringify(tasks))
//         setTasks((prev) => [...prev, task]);
//     };
//
//     const updateTask = (updatedTask) => {
//         setTasks(prevTasks =>
//             prevTasks.map(task =>
//                 task.id === updatedTask.id ? updatedTask : task
//             )
//         );
//     };
//     const getTaskById = (id) => tasks.find((task) => task.id === id);
//
//     return (
//         <TaskContext.Provider value={{ tasks,setTasks, addTask, updateTask, getTaskById }}>
//             {children}
//         </TaskContext.Provider>
//     );
// };
