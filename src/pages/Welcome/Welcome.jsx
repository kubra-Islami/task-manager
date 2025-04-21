import React, {useEffect} from 'react'
import MainLayout from '../../components/layout/MainLayout'
import TaskForm from '../../components/task/TaskForm'
import {Container} from "react-bootstrap";
import tasks from "@/pages/Tasks/Tasks.jsx";

const Welcome = () => {
    return (
        <MainLayout>
            <Container>
                <h2>👋 Welcome to Task Manager</h2>
                <p>You're just getting started. Let's create your first task!</p>
                <TaskForm />
            </Container>
        </MainLayout>
    )
}

export default Welcome
