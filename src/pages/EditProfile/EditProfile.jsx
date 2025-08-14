import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useTheme } from '../../Context/ThemeContext.jsx';
import { useAuth } from '../../Context/AuthContext.jsx';
import MainLayout from '../../components/layout/MainLayout.jsx';
import user_image from "../../assets/user.jpg";

const EditProfile = () => {
    const { user, setUser } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        avatar: '',
        reminders: true,
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                avatar: user.avatar || '',
                reminders: user.reminders ?? true,
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // const handleAvatarChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             setFormData((prev) => ({ ...prev, avatar: reader.result }));
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };
    // const handleAvatarChange = async (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const formData = new FormData();
    //         formData.append('avatar', file);
    //
    //         const response = await fetch('http://localhost:5000/upload-avatar', {
    //             method: 'POST',
    //             body: formData,
    //         });
    //
    //         const data = await response.json();
    //         if (data.filePath) {
    //             setFormData((prev) => ({ ...prev, avatar: data.filePath }));
    //         }
    //     }
    // };
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData((prev) => ({ ...prev, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUser(formData);
        localStorage.setItem("user", JSON.stringify(formData));


        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('avatar', file);

            const response = await fetch('http://localhost:5000/upload-avatar', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (data.filePath) {
                setFormData((prev) => ({...prev, avatar: data.filePath}));
            }
        }
        // alert('✅ Profile updated successfully!');
    };

    return (
        <MainLayout>
            <Container className="mt-5">
                <Card className="p-4 shadow-sm">
                    <h3 className="mb-4 text-primary">⚙️ Edit Profile Settings</h3>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Upload New Avatar</Form.Label>
                                    <Form.Control type="file" onChange={handleAvatarChange} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="switch"
                                        id="theme-switch"
                                        label={`Enable ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                                        checked={theme === 'dark'}
                                        onChange={toggleTheme}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Check
                                        type="checkbox"
                                        label="Receive task reminders"
                                        name="reminders"
                                        checked={formData.reminders}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                reminders: e.target.checked,
                                            }))
                                        }
                                    />
                                </Form.Group>

                                <Button type="submit" variant="primary">
                                    💾 Save Changes
                                </Button>
                            </Col>

                            <Col md={6} className="text-center mt-4 mt-md-0">
                                <img
                                    src={`http://localhost:5000${user?.avatar || user_image}`}
                                    alt="Avatar Preview"
                                    className="rounded-circle shadow-sm border"
                                    width={120}
                                    height={120}
                                />
                                <p className="mt-2 text-muted">Live Avatar Preview</p>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Container>
        </MainLayout>
    );
};

export default EditProfile;
