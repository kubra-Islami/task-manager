import React from 'react';
import { useState } from 'react';
import { useTaskStore } from '../store/taskStore.jsx';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const addTask = useTaskStore((state) => state.addTask);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() === '' || taskDescription.trim() === '') return;

        addTask(title,taskDescription);
        setTitle('');
        setTaskDescription('')
    };

    return (
        <form onSubmit={handleSubmit} className="add-task-form">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new task..."
            />
            <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Add description for task..."
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default TaskForm;
