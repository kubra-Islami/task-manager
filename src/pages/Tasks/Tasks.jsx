import React, { useState, useEffect } from 'react';
import { useTasks } from '../../context/TaskContext';
import MainLayout from '../../components/layout/MainLayout';
import { Card, Container, ListGroup, Row, Col, Badge, Button } from 'react-bootstrap';
import TaskCard from "@/components/task/TaskCard.jsx";
import TaskFilter from "@/components/task/TaskFilters.jsx";
import TaskFormModal from "@/components/TaskFormModal/TaskFormModal.jsx";

const Tasks = () => {
    const { tasks } = useTasks();
    const [showModal, setShowModal] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const [activeFilter, setActiveFilter] = useState({}); // to keep track of current filters

    // Re-apply filters whenever `tasks` or `activeFilter` changes
    useEffect(() => {
        filterTasks(activeFilter);
    }, [tasks]);

    const filterTasks = (filter) => {
        let filtered = tasks;

        if (filter.status) {
            filtered = filtered.filter(task => task.status === filter.status);
        }

        if (filter.tag) {
            filtered = filtered.filter(task => task.tag && task.tag.toLowerCase().includes(filter.tag.toLowerCase()));
        }

        setActiveFilter(filter); // Save current filters
        setFilteredTasks(filtered);
    };

    const handleEdit = (taskId) => {
        setSelectedTaskId(taskId);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <MainLayout>
            <Container className="py-4">
                <h2 className="mb-4">📋 My Tasks</h2>

                {/* Task Filter */}
                <TaskFilter onFilterChange={filterTasks} />

                {filteredTasks.length === 0 ? (
                    <div className="text-center text-muted theme-card">
                        <Card className="shadow-sm h-100 d-flex flex-column overflow-hidden">
                            <Card.Body className="p-3">
                                <p className="fs-5">No tasks match the filter criteria.</p>
                            </Card.Body>
                        </Card>
                    </div>
                ) : (
                    <Row xs={1} md={1} lg={2} xl={3} className="g-4">
                        {filteredTasks.map((task) => (
                            <Col key={task.id}>
                                <TaskCard task={task} handleEdit={handleEdit} />
                            </Col>
                        ))}
                    </Row>
                )}

                {showModal && (
                    <TaskFormModal
                        show={showModal}
                        handleClose={handleCloseModal}
                        taskId={selectedTaskId}
                    />
                )}
            </Container>
        </MainLayout>
    );
};

export default Tasks;
