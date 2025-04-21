import { Badge, Button, Card, ListGroup } from "react-bootstrap";
import React from "react";

const TaskCard = ({ task, handleEdit }) => {
    return (
        <Card className="shadow-sm h-100 d-flex flex-column overflow-hidden w-100">
            <Card.Body className="d-flex flex-column justify-content-between p-3">

                {/* Responsive Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-2 gap-2 flex-wrap">
                    <div className="d-flex align-items-center gap-2 flex-grow-1 min-w-0">
                        <div
                            style={{
                                backgroundColor: task.tag || '#ccc',
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                flexShrink: 0
                            }}
                        />
                        <Card.Title className="fw-bold mb-0 text-truncate" style={{ maxWidth: '100%' }}>
                            {task.title}
                        </Card.Title>
                    </div>

                    {/* Ensure badge doesn't shrink or overflow */}
                    <div className="flex-shrink-0">
                        <Badge bg="info" pill className="text-nowrap">
                            {task.status}
                        </Badge>
                    </div>
                </div>

                <Card.Subtitle className="mb-2 text-muted text-truncate">
                    📅 Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}
                </Card.Subtitle>

                {task.description && (
                    <Card.Text className="mb-3 text-secondary text-truncate">
                        {task.description}
                    </Card.Text>
                )}

                {task.subtasks?.length > 0 && (
                    <>
                        <h6 className="text-muted">✅ Subtasks:</h6>
                        <ListGroup variant="flush">
                            {task.subtasks.map((subtask, index) => (
                                <ListGroup.Item key={index} className="ps-0">
                                    • {subtask}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </>
                )}

                <Button
                    variant="warning"
                    className="w-25 mt-3"
                    onClick={() => handleEdit(task.id)}
                >
                    ✏️ Edit
                </Button>
            </Card.Body>
        </Card>
    );
};

export default TaskCard;
