import {Badge, Button, Card, ListGroup} from "react-bootstrap";
import React from "react";
import "./taskCard.css";

const TaskCard = ({task, handleEdit}) => {
    return (
        <div className="theme-card d-flex flex-column overflow-hidden w-100 p-2">

            <Card.Body className="d-flex flex-column  p-3 ">
                <div className="flex-grow-1">

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
                            <Card.Title className="fw-bold mb-0 text-truncate" style={{maxWidth: '100%'}}>
                                {task.title}
                            </Card.Title>
                        </div>
                    </div>

                    <Card.Subtitle className="mb-2 text-truncate">
                        📅 Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}
                    </Card.Subtitle>

                    {task.description && (
                        <Card.Text className="mb-2 text-secondary text-truncate">
                            {task.description}
                        </Card.Text>
                    )}

                    {task.subtasks?.length > 0 && (
                        <>
                            <h6 className="">✅ Subtasks:</h6>
                            <ListGroup variant="flush " className='sub-task-bg'>
                                {task.subtasks.map((subtask, index) => (
                                    <ListGroup.Item key={index} className="p-2">
                                        • {subtask}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </>
                    )}
                </div>
                <div className="mt-3">
                    <Button
                        variant="warning"
                        className="w-25"
                        onClick={() => handleEdit(task.id)}
                    >
                        ✏️ Edit
                    </Button>
                </div>
            </Card.Body>
        </div>
    );
};

export default TaskCard;
