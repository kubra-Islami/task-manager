import React, {useEffect, useState} from 'react';
import {Container, Button, Pagination } from 'react-bootstrap';
import {useTasks} from '../../context/TaskContext';
import MainLayout from '../../components/layout/MainLayout';
import TaskFilter from '@/components/task/TaskFilters/TaskFilters.jsx';
import TaskFormModal from '@/components/TaskFormModal/TaskFormModal';
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import "./tasks.css";
import SortableTasks from "@/components/task/SortableTasks/SortableTasks.jsx";
import RenderPagination from "@/components/task/Pagination/RenderPagination.jsx";

const Tasks = () => {
    const {tasks, setTasks} = useTasks();
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const [activeFilter, setActiveFilter] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
     // pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5; // or whatever number you prefer
    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

    // Calculate paginated tasks
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
    const sensors = useSensors(useSensor(PointerSensor));


    useEffect(() => {
        applyFilter(activeFilter);
    }, [tasks]);

    const applyFilter = (filter) => {
        let filtered = tasks;

        if (filter.status) {
            filtered = filtered.filter(task => task.status === filter.status);
        }

        if (filter.tag) {
            filtered = filtered.filter(task =>
                task.tag?.toLowerCase().includes(filter.tag.toLowerCase())
            );
        }

        setActiveFilter(filter);
        setFilteredTasks(filtered);
    };

    const handleEdit = (taskId) => {
        console.log("Editing Task ID:", taskId);
        setSelectedTaskId(taskId);
        setShowModal(true);
    };


    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTaskId(null); // Reset the selected task when closing the modal
    };

    const handleDragEnd = ({active, over}) => {
        if (active.id !== over?.id) {
            const oldIndex = filteredTasks.findIndex(t => t.id === active.id);
            const newIndex = filteredTasks.findIndex(t => t.id === over.id);
            const newTasks = arrayMove(filteredTasks, oldIndex, newIndex);

            setFilteredTasks(newTasks);
        }
    };

    const saveOrderToStorage = () => {
        setTasks(filteredTasks);
        localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    };
    useEffect(() => {
        if (selectedTaskId !== null) {
            console.log("Updated Selected Task ID:", selectedTaskId);
        }
    }, [selectedTaskId]);



    return (
        <MainLayout>
            <Container className="py-4">
                <h2 className="mb-4">📋 My Tasks</h2>


                <TaskFilter onFilterChange={applyFilter}/>

                <div className="d-flex justify-content-end mb-3">
                    <Button variant="success" onClick={saveOrderToStorage}>
                        💾 Save Order
                    </Button>
                </div>

                {filteredTasks.length === 0 ? (
                    <p className="text-muted text-center">No tasks match the filter criteria.</p>
                ) : (
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext
                            items={filteredTasks.map(task => task.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="custom-table">
                                <div className="table-header table-row">
                                    <div className="table-cell"></div>
                                    <div className="table-cell">#</div>
                                    <div className="table-cell">Title</div>
                                    <div className="table-cell">Description</div>
                                    <div className="table-cell">Status</div>
                                    <div className="table-cell">Priority</div>
                                    <div className="table-cell">Due Date</div>
                                    <div className="table-cell">SubTasks</div>
                                    <div className="table-cell">Tag</div>
                                    <div className="table-cell">Actions</div>
                                </div>

                                {currentTasks.map((task, index) => (
                                    <SortableTasks
                                        key={task.id}
                                        id={task.id}
                                        task={task}
                                        index={indexOfFirstTask + index}
                                        handleEdit={handleEdit}
                                        handleDelete={() => {
                                        }}
                                    />
                                ))}
                            </div>

                        </SortableContext>
                    </DndContext>
                )}

                {showModal && (
                    <TaskFormModal
                        show={showModal}
                        handleClose={handleCloseModal}
                        taskId={selectedTaskId}
                    />
                )}


            </Container>
            {filteredTasks.length > 0 && (
                <RenderPagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                />
            )}
        </MainLayout>
    );
};


export default Tasks;
