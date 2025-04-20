import React from 'react'
import MainLayout from '../../components/layout/MainLayout'
import { Container, Row, Col, Card, Button, Image, Badge } from 'react-bootstrap'
import { useTasks } from '../../context/TaskContext'
import "./Profile.css";
import {useUser} from "@/Context/UserContext.jsx";
const Profile = () => {
    const { tasks } = useTasks()
    const { user } = useUser();

    // const user = {
    //     name: 'Kobra Eslami',
    //     email: 'kobra@example.com',
    //     avatar: 'src/assets/avatar.jpg',
    // }

    const completedTasks = tasks.filter(task => task.status === 'Completed').length
    const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length
    const pendingTasks = tasks.filter(task => task.status === 'Pending').length

    return (
        <MainLayout>
            <Container>
                <h2 className="mb-4">👤 Profile</h2>

                <Row className="align-items-center mb-4">
                    <Col xs={12} md={4} className="text-center text-md-start">
                        <Image
                            src={user.avatar}
                            roundedCircle
                            width={120}
                            height={120}
                            alt="Profile"
                            className="mb-3"
                        />
                    </Col>
                    <Col xs={12} md={8}>
                        <h4 className="fw-bold">{user.name}</h4>
                        <p className="text-muted mb-1">{user.email}</p>
                        <Button variant="outline-primary" size="sm">
                            ✏️ Edit Profile
                        </Button>
                    </Col>
                </Row>

                <Row className="g-4">
                    <Col md={4}>
                        <Card className="text-center shadow-sm">
                            <Card.Body>
                                <h5 className="fw-bold">✅ Completed</h5>
                                <h2><Badge bg="success">{completedTasks}</Badge></h2>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="text-center shadow-sm">
                            <Card.Body>
                                <h5 className="fw-bold">🚧 In Progress</h5>
                                <h2><Badge bg="warning">{inProgressTasks}</Badge></h2>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="text-center shadow-sm">
                            <Card.Body>
                                <h5 className="fw-bold">📋 Pending</h5>
                                <h2><Badge bg="secondary">{pendingTasks}</Badge></h2>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    )
}

export default Profile
