import React, {useEffect, useState} from 'react';
import { Button, Table} from 'react-bootstrap';
import {useTasks} from '../../context/TaskContext';
import MainLayout from '../../components/layout/MainLayout';
import TaskFilter from '@/components/task/TaskFilters/TaskFilters.jsx';
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

import './tasks.css';
import SortableTasks from '@/components/task/SortableTasks/SortableTasks.jsx';
import RenderPagination from '@/components/task/Pagination/RenderPagination.jsx';

const Tasks = () => {
    const {tasks, setTasks} = useTasks();
    const [filteredTasks, setFilteredTasks] = useState([]);

    const hasTasks = tasks && tasks.length > 0;
    const hasFilteredTasks = filteredTasks && filteredTasks.length > 0;


    const [activeFilter, setActiveFilter] = useState({});
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    // pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5;
    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

    // Calculate paginated tasks
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
    const sensors = useSensors(useSensor(PointerSensor));




    useEffect(() => {
        if (tasks.length > 0) {
            applyFilter(activeFilter);
        }
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
            <div className="py-4 container-table">
                <h2 className="mb-4">📋 My Tasks</h2>

                <TaskFilter onFilterChange={applyFilter}/>

                <div className="d-flex justify-content-end mb-3">
                    <Button variant="success" onClick={saveOrderToStorage}>
                        💾 Save Order
                    </Button>
                </div>
                {
                    !hasTasks ? (
                        <Table className="task-table">
                            <tbody>
                            <tr>
                                <td className="centered-cell">
                                    <p className="statusFilter text-bold text-center p-3 m-0"
                                       style={{fontSize: '1.6rem', color:'rgb(187 24 24)'}}>
                                        No tasks available
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    ) : !hasFilteredTasks ? (
                        <Table className="task-table">
                            <tbody>
                            <tr>
                                <td className="centered-cell">
                                    <p className="statusFilter text-bold text-center p-3 m-0"
                                       style={{fontSize: '1.6rem', color:'rgb(187 24 24)'}}>
                                        No tasks match the filter criteria.
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    ) : (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext items={filteredTasks.map(task => task.id)}
                                             strategy={verticalListSortingStrategy}>
                                <div className="table-responsive">
                                    <Table striped bordered hover className="task-table">
                                        <thead>
                                        <tr>
                                            <th></th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Status</th>
                                            <th>Priority</th>
                                            <th>Due Date</th>
                                            <th>SubTasks</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {currentTasks.map((task, index) => (
                                            <SortableTasks key={task.id} id={task.id} task={task}
                                                           index={indexOfFirstTask + index}/>
                                        ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </SortableContext>
                        </DndContext>
                    )
                }

            </div>
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
