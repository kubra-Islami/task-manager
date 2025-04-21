import React, {useState} from 'react';
import { useTasks } from '../../context/TaskContext';
import MainLayout from '../../components/layout/MainLayout';
import {Card, Container, ListGroup, Row, Col, Badge, Button} from 'react-bootstrap';
import TaskFormModal from "@/components/TaskFormModal/TaskFormModal.jsx";

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
                <h2 className="mb-4 ">📋 My Tasks</h2>

                {tasks.length === 0 ? (
                    <div className="text-center text-muted">
                        <p className="fs-5">You haven't created any tasks yet.</p>
                        <p>Start by adding a task to manage your productivity 💡</p>
                    </div>
                ) : (
                    <Row xs={1} md={2} lg={3} className="g-4" >
                        {tasks.map((task) => (
                            <Col key={task.id}>
                                <Card className="shadow-sm h-100">
                                    <Card.Body>
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <div className="d-flex align-items-center gap-2">
                                                <div
                                                    style={{
                                                        backgroundColor: task.tag || '#ccc',
                                                        width: 12,
                                                        height: 12,
                                                        borderRadius: '50%',
                                                    }}
                                                />
                                                <Card.Title className="fw-bold mb-0">{task.title}</Card.Title>
                                            </div>
                                            <Badge bg="info" pill>{task.status}</Badge>
                                        </div>

                                        <Card.Subtitle className="mb-2 text-muted">
                                            📅 Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}
                                        </Card.Subtitle>

                                        {task.description && (
                                            <Card.Text className="mb-3 text-secondary">
                                                {task.description}
                                            </Card.Text>
                                        )}

                                        {task.subtasks?.length > 0 && (
                                            <>
                                                <h6 className="text-muted mb-2">✅ Subtasks:</h6>
                                                <ListGroup variant="flush">
                                                    {task.subtasks.map((subtask, index) => (
                                                        <ListGroup.Item key={index} className="ps-0">
                                                            • {subtask}
                                                        </ListGroup.Item>
                                                    ))}
                                                </ListGroup>
                                            </>
                                        )}
                                        <Button variant="warning" onClick={() => handleEdit(task.id)}>
                                            ✏️ Edit
                                        </Button>
                                    </Card.Body>

                                </Card>
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
