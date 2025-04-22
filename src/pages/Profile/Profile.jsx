import React, {useEffect} from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Container, Row, Col, Card, Button, Image, Badge, ListGroup } from 'react-bootstrap';
import { useTasks } from '../../context/TaskContext';
import { useUser } from '@/Context/UserContext.jsx';
import './Profile.css';

const Profile = () => {
    const { tasks } = useTasks();
    const { user } = useUser();

    console.log(tasks);  // Check if tasks are populated correctly
    const groupedTasks = {
        onHold: tasks.filter(task => task.status === 'on-hold'),
        cancelled: tasks.filter(task => task.status === 'cancelled'),
        toDo: tasks.filter(task => task.status === 'todo'),
        inProgress: tasks.filter(task => task.status === 'in-progress'),
        done: tasks.filter(task => task.status === 'done'),
    };
    console.log(groupedTasks);  // Check the grouped task counts


    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    return (
        <MainLayout>
            <Container className="py-4">
                <Row className="align-items-center mb-4">
                    <Col xs={12} md={4} className="text-center text-md-start mb-3 mb-md-0">
                        <Image
                            src={user.avatar}
                            roundedCircle
                            width={120}
                            height={120}
                            alt="Profile"
                            className="mb-3"
                        />
                    </Col>
                    <Col xs={12} md={8} className="text-center text-md-start mb-3 mb-md-0 d-flex flex-column justify-content-center align-items-center">
                        <h4 className="fw-bold">{user.name}</h4>
                        <p className=" mb-2">{user.email}</p>
                        <Button variant="outline-primary" size="sm">
                            ✏️ Edit Profile
                        </Button>
                    </Col>

                </Row>

                {/* Display task counts in cards */}
                <Row className="mb-4">
                    {Object.keys(groupedTasks).map((status) => (
                        <Col xs={12} sm={6} lg={4} className="mt-3" key={status}>
                            <Card className="text-center shadow-sm h-100 p-3 theme-card">
                                <Card.Body>
                                    <h5 className="fw-bold">{status.replace(/([A-Z])/g, ' $1')}</h5>
                                    <h2>
                                        <Badge bg="primary">{groupedTasks[status].length}</Badge>
                                    </h2>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </MainLayout>
    );
};

export default Profile;
