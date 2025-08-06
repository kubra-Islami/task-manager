import express from "express";
const app = express();

import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3000;

import taskRoutes from './routes/tasks.js';



app.use(express.json());
app.use("/task",taskRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log("index.js");
