import React, {useEffect, useState} from 'react';
import {useLocation, useParams, useNavigate} from 'react-router-dom';
import {Button, Badge} from 'react-bootstrap';
import {format} from 'date-fns';
import TaskFormModal from "@/components/TaskFormModal/TaskFormModal.jsx";
import {useTasks} from "@/context/TaskContext";
import MainLayout from "@/components/layout/MainLayout.jsx";

const TaskDetails = () => {
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const {tasks} = useTasks();

    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [task, setTask] = useState(() => {
        const taskFromState = location.state?.task;
        const taskFromContext = tasks.find(t => t.id === Number(id));
        return taskFromState || taskFromContext;
    });

    useEffect(() => {
        const updatedTask = tasks.find(t => t.id === Number(id));
        setTask(updatedTask);
    }, [tasks, id]);


    const handleEdit = (taskId) => {
        console.log("Editing Task ID:", taskId);
        setSelectedTaskId(taskId);
        setShowModal(true);
    };


    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTaskId(null);
    };

    if (!task) {
        return (
            <MainLayout>
                <div className="container mt-5">
                    <h3>No task data found for ID: {id}</h3>
                    <Button variant="secondary" onClick={() => navigate(-1)}>Go Back</Button>
                </div>
            </MainLayout>
        );
    }

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'todo':
                return 'status-badge todo';
            case 'in-progress':
                return 'status-badge in-progress';
            case 'cancelled':
                return 'status-badge cancelled';
            case 'On-Hold':
                return 'status-badge on-hold';
            case 'done':
                return 'status-badge done';
            default:
                return 'status-badge';
        }
    };

    return (
        <MainLayout>
            <div className="container mt-5 theme-card p-5">
                <h2>Task Details</h2>
                <hr/>
                <p><strong className="me-2">Title:</strong> {task.title}</p>
                <p><strong className="me-2">Description:</strong> {task.description}</p>
                <p><strong className="me-2">Status:</strong>
                    <span className={getStatusBadgeClass(task.status)}>
                                    {task.status.replace('-', ' ')}
                    </span>
                </p>
                <p><strong className="me-2">Priority:</strong> <Badge bg="warning" text="dark">{task.priority}</Badge>
                </p>
                <p><strong className="me-2">Due
                    Date:</strong> {task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : 'No due date'}</p>
                <p><strong className="me-2">Subtasks:</strong></p>
                <ul>
                    {task.subtasks && task.subtasks.length > 0 ? (
                        task.subtasks.map((sub, idx) => <li key={idx}>{sub}</li>)
                    ) : (
                        <li>No subtasks</li>
                    )}
                </ul>
                <Button className="mt-3" variant="primary" onClick={() => navigate(-1)}>Back to Tasks</Button>
                <Button className="mt-3 mx-3" variant="danger">Delete</Button>
                <Button className="mt-3 mx-0" variant="warning" onClick={() => handleEdit(task.id)}>Edit</Button>

                {showModal && (
                    <TaskFormModal
                        show={showModal}
                        handleClose={handleCloseModal}
                        taskId={selectedTaskId}
                    />
                )}
            </div>
        </MainLayout>
    );
};

export default TaskDetails;
