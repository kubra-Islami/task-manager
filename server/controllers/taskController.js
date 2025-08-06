// const taskService = require('../services/taskService');
import taskService from '../services/taskService.js';

const getAllTasks = async (req, res) => {
    try {


    } catch (err) {
        // res.status(500).json({error: err, message});
    }
}

// console.log("taskController.js *************************");
const AddTask = async (req, res) => {
    try {
        const {title, description, due_date, priority} = req.body;
        const result = taskService.createTask({title, description, due_date, priority});
        res.status(201).json({
            status: "success",
            result: result
        });
        console.log("AddTask function from taskController.js *************************");

    } catch (error) {
        res.status(500).json({status: "failed", error: error});
    }
}

export default {
    AddTask
}