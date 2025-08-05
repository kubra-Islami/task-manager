// Overview: task stats
// Quick create task
// Kanban board (To Do, In Progress, Done)

// src/pages/Dashboard/Dashboard.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../components/layout/MainLayout.jsx'

const Dashboard = () => {
    const [tasks, setTasks] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const userTasks = []
        setTasks(userTasks)

        if (userTasks.length === 0) {
            // Redirect if no tasks exist
            navigate('/welcome')
        }
    }, [navigate])

    return (
        <MainLayout>
            <h2>Welcome to your Dashboard</h2>
            {tasks.length === 0 ? (
                <p>You have no tasks yet. Let’s get started!</p>
            ) : (
                <p>Here’s a list of your tasks!</p>
            )}
        </MainLayout>
    )
}

export default Dashboard

