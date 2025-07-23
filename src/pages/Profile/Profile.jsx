import React, {useEffect} from 'react';
import MainLayout from '../../components/layout/MainLayout';
import {Container, Row, Col, Button, Image} from 'react-bootstrap';
import {useTasks} from '../../context/TaskContext';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '@/context/AuthContext';
import RecentTasks from "@/components/task/RecentTasks/RecentTasks.jsx";
import user_image from "../../assets/user.jpg";
import './Profile.css';

const Profile = () => {
    const {tasks} = useTasks();
    // const { user } = useUser();
    const {user} = useAuth();
    const navigate = useNavigate();
    const { logout } = useAuth();


    useEffect(() => {
        console.log('📦 Tasks Updated:', tasks.map(t => ({id: t.id, title: t.title, status: t.status})));
    }, [tasks]);

    const handleEditProfile = () => {
        navigate('/settings');
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <MainLayout>
            <Container className="py-4">
                {user ? (
                    <>
                        <Row className="align-items-center mb-4">
                            <Col xs={12} md={4} className="text-center text-md-start mb-3 mb-md-0">
                                <Image
                                    src={user.avatar || user_image}
                                    roundedCircle
                                    width={120}
                                    height={120}
                                    alt="Profile"
                                    className="mb-3"
                                />
                            </Col>
                            <Col
                                xs={12}
                                md={8}
                                className="text-center text-md-start d-flex flex-column justify-content-center align-items-center gap-2"
                            >
                                <h4 className="fw-bold">{user?.name}</h4>
                                <p className="mb-2">{user?.email}</p>
                                <div className="d-flex gap-2">
                                    <Button variant="outline-primary" size="sm" onClick={handleEditProfile}>
                                        ✏️ Edit Profile
                                    </Button>
                                    <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                                        🔓 Logout
                                    </Button>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12} lg={6}>
                                <RecentTasks />
                            </Col>
                        </Row>
                    </>
                ) : (
                    <p>Loading user data...</p>
                )}
            </Container>
        </MainLayout>
    );

};

export default Profile;
