import React from 'react';
import {useForm, useFieldArray, Controller} from 'react-hook-form';
import {Form, Button, Row, Col, Container, OverlayTrigger, Tooltip} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import {useNavigate} from 'react-router-dom';

import {motion, AnimatePresence} from 'framer-motion';
import {useTasks} from "@/Context/TaskContext.jsx";

const priorities = ['Low', 'Medium', 'High'];

const TaskForm = () => {
    const {register, control, handleSubmit, setValue, watch, formState: {errors}, reset} = useForm({
        defaultValues: {
            title: '',
            description: '',
            dueDate: null,
            priority: '',
            tag: '',
            subtasks: ['']
        }
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: 'subtasks'
    });

    const {addTask} = useTasks();
    const navigate = useNavigate();

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
        <Container className="theme-card mt-5 p-4 rounded shadow-sm">
            <h2 className="mb-4">📝 Create New Task</h2>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Task Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter task title"
                        {...register('title', {required: 'Task title is required'})}
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
                <Form.Group className="mb-3 ">
                    <Form.Label>Due Date</Form.Label>
                    <Controller
                        control={control}
                        name="dueDate"
                        render={({field}) => (
                            <DatePicker
                                className="form-control ms-3"
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
                    <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                        <Form.Group>
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
                </Row>

                <AnimatePresence>
                    {fields.map((field, index) => (
                        <motion.div
                            key={field.id}
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -10}}
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
    )
        ;
};

export default TaskForm;
