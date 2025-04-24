import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { format } from 'date-fns';
import {Link} from "react-router-dom";

const tagLabels = {
    "#ff0000": "Urgent",
    "#00ff00": "Green Task",
    "#0000ff": "Blue Task",
    "#ffa500": "Medium Priority",
    "#800080": "Purple Tag",
};

const statusTagColors = {
    Cancelled: "#EF4444FF",
    "In Progress": "#3B82F6FF",
    Completed: "#10B981FF",
    todo: "#FBBF24FF",
    "on-hold": "#8B5CF6FF",
};

const SortableTasks = ({ id, task, handleEdit, handleDelete, index }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id,
        disabled: false,
    });

    const tagColor = statusTagColors[task.status] || task.tag;

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: "grab",
        backgroundColor: isDragging ? "#f8f9fa" : "white",
    };

    const truncateSubtasks = (subtasks) => {
        if (subtasks.length > 3) {
            return subtasks.slice(0, 3).join(", ") + "...";
        }
        return subtasks.join(", ");
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="table-row d-flex align-items-center"
        >
            {/* Drag Handle */}
            <div
                className="table-cell drag-handle"
                {...listeners} // Drag listeners applied only here
                style={{ cursor: "grab", padding: "0 8px" }}
            >
                <span style={{ fontWeight: "bold", fontSize: "18px" }}>⋮⋮</span>
            </div>

            <div className="table-cell">{index + 1}</div>
            <div className="table-cell">{task.title}</div>
            <div className="table-cell">{task.description}</div>
            <div className="table-cell">{task.status}</div>
            <div className="table-cell">{task.priority}</div>
            <div className="table-cell">{task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : 'No due date'}</div>
            <div className="table-cell">{truncateSubtasks(task.subtasks)}</div>
            <div className="table-cell">
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip id={`tooltip-${task.tag}`}>
                            {tagLabels[task.tag]}
                        </Tooltip>
                    }
                >
                    <div
                        style={{
                            backgroundColor: tagColor,
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            margin: "auto",
                            border: "1px solid #ccc",
                        }}
                    />
                </OverlayTrigger>
            </div>
            <div className="table-cell">
                {/*<Button*/}
                {/*    size="sm"*/}
                {/*    variant="outline-primary mx-1"*/}
                {/*    onClick={() => handleEdit(task.id)} // Edit button remains unaffected*/}
                {/*>*/}
                {/*    Edit*/}
                {/*</Button>*/}
                <Button
                    size="sm"
                    className='btn btn-primary'
                    onClick={() => handleDelete(task.id)} // Delete button remains unaffected
                >
                    <Link to="/task:id">View</Link>
                </Button>
            </div>
        </div>
    );
};

export default SortableTasks;
