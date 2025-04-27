import React, { useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Container, Row, Col, Card, Button, Image, Badge, ListGroup } from 'react-bootstrap';
import { useTasks } from '../../context/TaskContext';
import { useUser } from '@/Context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import RecentTasks from "@/components/task/RecentTasks/RecentTasks.jsx";
import './Profile.css';


const Profile = () => {
    const { tasks } = useTasks();
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('📦 Tasks Updated:', tasks.map(t => ({ id: t.id, title: t.title, status: t.status })));
    }, [tasks]);

    const handleEditProfile = () => {
        navigate('/settings'); // Or open a modal instead
    };

    return (
        <MainLayout>
            <Container className="py-4">
                {/* Profile Header */}
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
                    <Col xs={12} md={8}
                        className="text-center text-md-start mb-3 mb-md-0 d-flex flex-column justify-content-center align-items-center">
                        <h4 className="fw-bold">{user.name}</h4>
                        <p className="mb-2">{user.email}</p>
                        <Button variant="outline-primary" size="sm" onClick={handleEditProfile}>
                            ✏️ Edit Profile
                        </Button>
                    </Col>
                </Row>

                <Row>
                    <Col md={12} lg={6}>
                        <RecentTasks />
                    </Col>
                </Row>

            </Container>
        </MainLayout>
    );
};

export default Profile;
