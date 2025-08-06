import db from '../config/db.js';

const create = async (task) => {
    // try {
    const {title, description,due_date, priority,user_id} = task;
        const result = await db.query(
            `INSERT INTO tasks (title, description, due_date, priority,user_id)
             VALUES ($1, $2, $3, $4,$5) RETURNING *`, [title, description, due_date, priority]
        );
        console.log("taskModel , db just")
        return result.rows[0];

    // } catch (err) {
    //     throw new Error("Error creating task" + err.message);
    // }
}


export default {
    create
};