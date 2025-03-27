import {useTaskStore} from "../store/taskStore.ts";
import {useState} from "react";


const AddTask = () => {
    const [title, setTitle] = useState('');
    const addTask = useTaskStore(state => state.addTask);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title.trim()) {
            addTask(title);
            setTitle('');
        }

    };


    return (
        <form onSubmit={handleSubmit} className='add-task-form'>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="add a task ..." />

            <button type="submit">Add Task</button>
        </form>
    )

}

export default AddTask;