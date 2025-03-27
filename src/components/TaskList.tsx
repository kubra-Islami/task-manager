import {useTaskStore} from '../store/taskStore';
import {FaTrash, FaCheck} from 'react-icons/fa';


const TaskList = () => {
    const {tasks, updateTask, deleteTask} = useTaskStore();


    return (
        <div className='task-list'>
            {
                tasks.map((task) => (
                    <div key={task.id} className={`task ${task.status}`}>
                        <p>{task.title}</p>
                        <div className="action">
                            {
                                task.status !== 'done' &&
                                (
                                    <button onClick={() => updateTask(task.id, 'done')}>
                                        <FaCheck/>
                                    </button>
                                )}
                            <button onClick={() => deleteTask(task.id)}>
                                <FaTrash/>
                            </button>
                        </div>
                    </div>
                ))
            }

        </div>
    )


}

export default TaskList;