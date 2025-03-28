import {
    useSortable,
} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {FaTrash, FaCheck, FaSpinner} from 'react-icons/fa';

const TaskItem = ({task, index, updateTask, deleteTask}) => {
    const {attributes, listeners, setNodeRef, transform, transition, isDragging} =
        useSortable({id: task.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`task ${task.status} ${isDragging ? "dragging" : ""}`}
            {...attributes}
            {...listeners}
        >
            <p>{task.title}</p>
            {/*<p>{task.taskDescription}</p>*/}
            <div className="actions">
                {task.status !== "done" && (
                    <button onClick={() => updateTask(task.id, "done")}>
                        <FaCheck/>
                    </button>
                )}
                <button onClick={() => deleteTask(task.id,"")}>
                    <FaTrash/>
                </button>
                <button onClick={() => updateTask(task.id,"in-progress")}>
                    <FaSpinner className={task.status === "in-progress" ? "spinActive" : ""} />
                </button>
            </div>
        </div>
    );
};

export default TaskItem;