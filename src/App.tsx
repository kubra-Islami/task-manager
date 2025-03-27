import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import './styles.css';

function App() {


    return (
        <div className='container'>
            <h1>Task Maneging</h1>
            <AddTask/>
            <TaskList/>
        </div>
    )
}

export default App
