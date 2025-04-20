// Used for both add/edit task
// Form for adding/editing a task


// src/components/task/TaskForm.jsx
import React, { useState } from 'react';
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useTasks } from '../../context/TaskContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const priorities = ['Low', 'Medium', 'High'];
const tagColors = ['#F87171', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA'];

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [priority, setPriority] = useState('');
    const [tag, setTag] = useState('');
    const [subtasks, setSubtasks] = useState(['']);
    const [error, setError] = useState('');
    const { addTask } = useTasks();
    const navigate = useNavigate();

    const handleSubtaskChange = (index, value) => {
        const newSubtasks = [...subtasks];
        newSubtasks[index] = value;
        setSubtasks(newSubtasks);
    };

    const addSubtask = () => setSubtasks([...subtasks, '']);

    const removeSubtask = (index) => {
        const newSubtasks = subtasks.filter((_, i) => i !== index);
        setSubtasks(newSubtasks);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setError('Task title is required.');
            return;
        }

        const newTask = {
            id: Date.now(),
            title,
            description,
            dueDate,
            subtasks: subtasks.filter((s) => s.trim() !== ''),
            status: 'todo',
            priority,
            tag
        };

        addTask(newTask);
        setTitle('');
        setDescription('');
        setDueDate(null);
        setPriority('');
        setTag('');
        setSubtasks(['']);
        navigate('/tasks');
    };

    return (
        <Container className="mt-5 p-4 bg-light rounded shadow-sm">
            <h2 className="mb-4">📝 Create New Task</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Task Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        isInvalid={!title.trim() && error}
                    />
                    <Form.Control.Feedback type="invalid">
                        Title is required.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Describe the task"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Due Date</Form.Label>
                    <DatePicker
                        selected={dueDate}
                        onChange={(date) => setDueDate(date)}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                        placeholderText="Select due date"
                        isClearable
                        showMonthYearDropdown
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label>Priority</Form.Label>
                            <Form.Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <option value="">Select priority</option>
                                {priorities.map((p) => (
                                    <option key={p} value={p}>
                                        {p}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Color Tag</Form.Label>
                            <div className="d-flex gap-2">
                                {tagColors.map((color) => (
                                    <div
                                        key={color}
                                        onClick={() => setTag(color)}
                                        style={{
                                            backgroundColor: color,
                                            width: 24,
                                            height: 24,
                                            borderRadius: '50%',
                                            cursor: 'pointer',
                                            border: tag === color ? '2px solid #000' : '1px solid #ccc'
                                        }}
                                    />
                                ))}
                            </div>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Label>Subtasks</Form.Label>
                <AnimatePresence>
                    {subtasks.map((subtask, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <Row className="mb-2">
                                <Col xs={10}>
                                    <Form.Control
                                        type="text"
                                        placeholder={`Subtask #${index + 1}`}
                                        value={subtask}
                                        onChange={(e) => handleSubtaskChange(index, e.target.value)}
                                    />
                                </Col>
                                <Col xs={2}>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => removeSubtask(index)}
                                        disabled={subtasks.length === 1}
                                    >
                                        ❌
                                    </Button>
                                </Col>
                            </Row>
                        </motion.div>
                    ))}
                </AnimatePresence>

                <Button variant="warning" onClick={addSubtask} className="mb-3">
                    ➕ Add Subtask
                </Button>

                <div>
                    <Button type="submit" variant="success">
                        ✅ Create Task
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default TaskForm;
