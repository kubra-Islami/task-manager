import express from 'express';
const router = express.Router();
import taskController from '../controllers/taskController.js';



router.post('/add_task',taskController.AddTask);
console.log("tasks.js");




export default router;
