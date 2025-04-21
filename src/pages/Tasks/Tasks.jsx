import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import MainLayout from '../../components/layout/MainLayout';
import { Card, Container, ListGroup, Row, Col, Badge, Button } from 'react-bootstrap';
import TaskFormModal from "@/components/TaskFormModal/TaskFormModal.jsx";
import TaskCard from "@/components/task/TaskCard.jsx";

const Tasks = () => {
    const { tasks } = useTasks();
    const [showModal, setShowModal] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const handleEdit = (taskId) => {
        setSelectedTaskId(taskId);
        setShowModal(true);  // Open the modal
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close the modal
    };

    return (
        <MainLayout>
            <Container className="py-4">
                <h2 className="mb-4 text-center">📋 My Tasks</h2>

                {tasks.length === 0 ? (
                    <div className="text-center text-muted">
                        <p className="fs-5">You haven't created any tasks yet.</p>
                        <p>Start by adding a task to manage your productivity 💡</p>
                    </div>
                ) : (
                    <Row xs={1} sm={1} md={1} lg={2} xl={3} className="g-4 ">
                        {tasks.map((task) => (
                            <Col key={task.id}>
                                <TaskCard task={task} handleEdit={handleEdit} />
                            </Col>
                        ))}
                    </Row>
                )}

                {/* Show the modal when showModal is true */}
                {showModal && (
                    <TaskFormModal
                        show={showModal}
                        handleClose={handleCloseModal}
                        taskId={selectedTaskId} // Pass the selected task ID to the modal
                    />
                )}
            </Container>
        </MainLayout>
    );
};

export default Tasks;
