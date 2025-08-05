import React, {useEffect} from 'react';
import MainLayout from '../../components/layout/MainLayout.jsx';
import {Container, Row, Col, Button, Image, ListGroup} from 'react-bootstrap';
import {useTasks} from '../../Context/TaskContext.jsx';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../Context/AuthContext.jsx';
import RecentTasks from "../../components/task/RecentTasks/RecentTasks.jsx";
import user_image from "../../assets/user.jpg";
import './Profile.css';

const Profile = () => {
    const {tasks} = useTasks();
    const {user} = useAuth();
    const navigate = useNavigate();
    const {logout} = useAuth();

    useEffect(() => {
    }, [tasks]);

    const handleEditProfile = () => {
        navigate('/editprofile');
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
                                    src={`http://localhost:5000${user?.avatar || user_image}`}
                                    roundedCircle
                                    width={120}
                                    height={120}
                                    alt="User Avatar"
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
                            {tasks.length === 0 ? (
                                <ListGroup>
                                    <ListGroup.Item className="text-muted no-task-msg text-center py-4">
                                        <div>
                                            <p>No recent tasks available.</p>
                                            <Button variant="primary" size="sm"
                                                    onClick={() => navigate('/welcome')}>+ Add Task</Button>
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                            ) : (
                                <RecentTasks/>
                            )}

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
