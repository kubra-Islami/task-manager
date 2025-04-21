// src/components/TaskFormModal.jsx
import React, { useEffect } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { useForm, useFieldArray } from 'react-hook-form';
import { useTasks } from '../../context/TaskContext';

const tagColors = ['#F87171', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA'];

const TaskFormModal = ({ show, handleClose, taskId }) => {
    const { tasks, updateTask } = useTasks();
    const task = tasks.find((t) => t.id === taskId);

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const {
        register,
        handleSubmit,
        reset,
        control,
        watch,
        setValue,
    } = useForm({
        defaultValues: {
            title: '',
            description: '',
            dueDate: '',
            status: 'todo',
            tag: '',
            subtasks: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'subtasks',
    });

    const tag = watch('tag');

    useEffect(() => {
        if (task) {
            const formatToDateInput = (dateString) => {
                const date = new Date(dateString);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            };

            const formattedTask = {
                ...task,
                dueDate: task.dueDate ? formatToDateInput(task.dueDate) : '',
                subtasks: task.subtasks?.map((sub) =>
                    typeof sub === 'string' ? { text: sub } : sub
                ) || [],
            };

            reset(formattedTask);
        }
    }, [task, reset]);


    const onSubmit = (data) => {
        const updated = {
            ...data,
            id: taskId,
            subtasks: data.subtasks.map((s) => s.text.trim()).filter(Boolean),
        };
        updateTask(updated);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control {...register('title', { required: true })} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} {...register('description')} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control type="date" {...register('dueDate')} />
                        <Form.Text className="text-muted">
                            {formatDate(task?.dueDate)}
                        </Form.Text>
                    </Form.Group>


                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select {...register('status')}>
                            <option value="todo">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="On-Hold">On Hold</option>
                            <option value="done">Done</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Tag Color</Form.Label>
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
                                        border: tag === color ? '2px solid #000' : '1px solid #ccc',
                                    }}
                                />
                            ))}
                        </div>
                    </Form.Group>

                    <div className="mb-3">
                        <Form.Label>Subtasks</Form.Label>
                        {fields.map((field, index) => (
                            <InputGroup className="mb-2" key={field.id}>
                                <Form.Control {...register(`subtasks.${index}.text`)} />
                                <Button
                                    variant="outline-danger"
                                    onClick={() => remove(index)}
                                >
                                    ❌
                                </Button>
                            </InputGroup>
                        ))}
                        <Button
                            type="button"
                            variant="outline-secondary"
                            onClick={() => append({ text: '' })}
                        >
                            ➕ Add Subtask
                        </Button>
                    </div>

                    <Button variant="primary" type="submit" className="w-100">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default TaskFormModal;
