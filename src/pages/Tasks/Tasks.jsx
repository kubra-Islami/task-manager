import React, {useEffect, useState} from 'react';
import {Container, Button, Table} from 'react-bootstrap';
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
import {CSS} from '@dnd-kit/utilities';
import "./tasks.css";
import SortableTasks from "@/components/task/SortableTasks/SortableTasks.jsx";
import RenderPagination from "@/components/task/Pagination/RenderPagination.jsx";

const Tasks = () => {
    const {tasks, setTasks} = useTasks();
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const [activeFilter, setActiveFilter] = useState({});
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
    const [isPreloaderVisible, setPreloaderVisible] = useState(true);

    useEffect(() => {
        // The preloader will be hidden after first load
        const isPreloaderShown = localStorage.getItem("preloaderShown");
        if (isPreloaderShown) {
            setPreloaderVisible(false);
        }
    }, []);

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

                {filteredTasks.length === 0 ? (
                    <p className="text-muted text-center">No tasks match the filter criteria.</p>
                ) : (
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext
                            items={filteredTasks.map(task => task.id)}
                            strategy={verticalListSortingStrategy}>

                            <div className="table-responsive">
                                <Table striped bordered hover className="task-table">
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th>#</th>
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
                                        <SortableTasks
                                            key={task.id}
                                            id={task.id}
                                            task={task}
                                            index={indexOfFirstTask + index}
                                        />
                                    ))}
                                    </tbody>
                                </Table>
                            </div>

                        </SortableContext>
                    </DndContext>

                )}
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
