import React from "react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {format} from 'date-fns';
import {Link} from "react-router-dom";

const getStatusBadgeClass = (status) => {
    switch (status) {
        case 'todo':
            return 'status-badge todo';
        case 'in-progress':
            return 'status-badge in-progress';
        case 'cancelled':
            return 'status-badge cancelled';
        case 'On-Hold':
            return 'status-badge on-hold';
        case 'done':
            return 'status-badge done';
        default:
            return 'status-badge';
    }
};


const SortableTasks = ({id, task, index}) => {
// const SortableTasks = React.memo(({id, task, index}) => {
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
        <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <td data-label="">⋮⋮</td>
            <td data-label="#"> {index + 1} </td>
            <td data-label="Title"> {task.title} </td>
            <td data-label="Description"> {task.description} </td>
            <td data-label="Status">
                <span className={getStatusBadgeClass(task.status)}>
                  {task.status.replace('-', ' ')}
                </span>
            </td>
            <td data-label="Priority"> {task.priority} </td>
            <td data-label="Due Date">
                {task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : 'No due date'}
            </td>
            <td data-label="Subtasks"> {truncateSubtasks(task.subtasks)} </td>
            <td data-label="Actions">
                <Link
                    to={`/tasks/${task.id}`}
                    state={{task}}
                    className="btn btn-primary btn-sm text-white mx-1">
                    View
                </Link>
            </td>
        </tr>
    );
};
// });

export default SortableTasks;
