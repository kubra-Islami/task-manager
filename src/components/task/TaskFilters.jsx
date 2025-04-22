// Search, sort, and filter tasks
// UI for filtering by status, priority, etc.


import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import { Form, Row, Col, Button } from 'react-bootstrap';

const TaskFilter = ({ onFilterChange }) => {
    const [status, setStatus] = useState('');
    const [tag, setTag] = useState('');

    const handleFilterChange = () => {
        onFilterChange({ status, tag });
    };

    return (
        <Row className="mb-4">
            <Col xs={12} sm={6} md={4} className="mt-2">
                <Form.Group controlId="statusFilter">
                    <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">All status</option>
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="On-Hold">On Hold</option>
                        <option value="done">Done</option>
                    </Form.Control>
                </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={1} className="mt-2">
                <Button onClick={handleFilterChange}>Filter</Button>
            </Col>
        </Row>
    );
};

export default TaskFilter;
