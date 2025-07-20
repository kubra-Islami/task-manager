import {Button, Modal} from "react-bootstrap";
import React from "react";
import {useTasks} from "@/Context/TaskContext.jsx";
import {useNavigate} from "react-router-dom";

const DeleteTaskModal = ({show, handleClose, taskId}) => {
    const {tasks, setTasks} = useTasks();
    const navigate = useNavigate();

    const onDeleteTask = (task_Id) => {
        const updatedTasks = tasks.filter(t => t.id !== task_Id);
        setTasks(updatedTasks);
        setShowToast(true);
        handleClose();
        navigate('/tasks');
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this task?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>No</Button>
                    <Button variant="danger" onClick={() => onDeleteTask(taskId)}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteTaskModal;
