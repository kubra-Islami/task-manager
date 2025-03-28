import React from 'react';
import {useTaskStore} from '../store/taskStore.jsx';
import TaskItem from './TaskItem';
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,
    KeyboardSensor,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";



const TaskList = () => {
    const {tasks, setTasks, updateTask, deleteTask} = useTaskStore();
    // Sensors for Dragging
    const sensors = useSensors(
        useSensor(PointerSensor,{
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor,{
            activationConstraint: {
                delay: 200,
                tolerance: 6,
            },
        })
    );

    // Handle drag and drop sorting
    const handleDragEnd = (event) => {
        const {active, over} = event;
        if (!over || active.id === over.id) return;

        const oldIndex = tasks.findIndex((task) => task.id === active.id);
        const newIndex = tasks.findIndex((task) => task.id === over.id);
        setTasks(arrayMove(tasks, oldIndex, newIndex)); // Reorder tasks
    };


    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                <div className="task-list">
                    {tasks.map((task, index) => (
                        <TaskItem key={task.id} task={task} index={index} updateTask={updateTask}
                                  deleteTask={deleteTask}/>
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
};

export default TaskList;
