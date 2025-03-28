import React from 'react';
import AddTask from './components/AddTask.jsx';
import TaskList from './components/TaskList.jsx';
import './styles.css';

function App() {
    return (
        <div className='container'>
            <h1>Task Management</h1>
            <AddTask/>
            <TaskList/>
        </div>
    )
}

export default App
