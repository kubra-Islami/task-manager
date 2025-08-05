import React from 'react'
import MainLayout from '../../components/layout/MainLayout.jsx'
import TaskForm from '../../components/task/TaskForm/TaskForm.jsx'
import {Alert, Container} from "react-bootstrap";
import { useTasks } from '../../Context/TaskContext.jsx';

const Welcome = () => {
    const { tasks } = useTasks();
    const hasTasks = tasks.length > 0;

    return (
        <MainLayout>
            <Container>
                <h2 className="mb-3 text-muted fw-bold">
                    👋 Welcome to Task Manager
                </h2>
                <Alert variant={hasTasks ? 'info' : 'success'}>

                    {hasTasks ? (
                        <>
                            🚀 Add more tasks or update the existing ones.
                        </>
                    ) : (
                        <>
                            ✨ You're just getting started. Let's create your first task!
                        </>
                    )}
                </Alert>
                <TaskForm />
            </Container>
        </MainLayout>
    )
}

export default Welcome
