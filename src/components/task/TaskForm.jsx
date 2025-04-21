// Used for both add/edit task
// Form for adding/editing a task


import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Form, Button, Row, Col, Container} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useTasks } from '../../context/TaskContext';
import { useNavigate } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';

const priorities = ['Low', 'Medium', 'High'];
const tagColors = ['#F87171', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA'];

const TaskForm = () => {
    const { register, control, handleSubmit, setValue, watch, formState: { errors },reset  } = useForm({
        defaultValues: {
            title: '',
            description: '',
            dueDate: null,
            priority: '',
            tag: '',
            subtasks: ['']
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'subtasks'
    });

    const { addTask } = useTasks();
    const navigate = useNavigate();
    const tag = watch('tag');

    const onSubmit = (data) => {
        const newTask = {
            id: Date.now(),
            ...data,
            subtasks: data.subtasks.filter(s => s.trim() !== ''),
            status: 'todo',
        };

        addTask(newTask);
        reset();
        navigate('/tasks');
    };

    return (
        <Container className="mt-5 p-4 bg-light rounded shadow-sm">
            <h2 className="mb-4">📝 Create New Task</h2>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Task Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter task title"
                        {...register('title', { required: 'Task title is required' })}
                        isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.title?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Describe the task"
                        {...register('description')}
                    />
                </Form.Group>
                <Form.Group className="mb-3 w-50">
                    <Form.Label>Status</Form.Label>
                    <Form.Select {...register('status')}>
                        <option value="">Select Status</option>
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="On-Hold">On Hold</option>
                        <option value="done">Done</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 ">
                    <Form.Label>Due Date</Form.Label>
                    <Controller
                        control={control}
                        name="dueDate"
                        render={({ field }) => (
                            <DatePicker
                                className="form-control"
                                placeholderText="Select due date"
                                showMonthYearDropdown
                                isClearable
                                dateFormat="yyyy-MM-dd"
                                {...field}
                                selected={field.value}
                            />
                        )}
                    />
                </Form.Group>

                <Row className="mb-3 ">
                    <Col>
                        <Form.Group >
                            <Form.Label>Priority</Form.Label>
                            <Form.Select {...register('priority')}>
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
                                        onClick={() => setValue('tag', color)}
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

                {/*<Form.Label>Subtasks</Form.Label>*/}
                <AnimatePresence>
                    {fields.map((field, index) => (
                        <motion.div
                            key={field.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <Row className="mb-2">
                                <Col xs={10}>
                                    <Form.Control
                                        type="text"
                                        placeholder={`Subtask #${index + 1}`}
                                        {...register(`subtasks.${index}`)}
                                    />
                                </Col>
                                <Col xs={2}>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => remove(index)} // Properly remove the subtask by index
                                    >
                                        ❌
                                    </Button>
                                </Col>
                            </Row>
                        </motion.div>
                    ))}
                </AnimatePresence>


                <Button variant="warning" onClick={() => append('')} className="mb-3">
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
