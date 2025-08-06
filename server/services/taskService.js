import taskModel from '../models/taskModel.js';

const createTask = async ({taskData, userId}) => {
    if (!title) throw new Error('Title is required');
    return await taskModel.create({...taskData,user_id: userId});
}
// const createTask = ({title, description, due_date, priority}) => taskModel.create(data);

export default {
    createTask
};