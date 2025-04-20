// Theme toggle

// Notification preferences

import React, {useState} from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import {useUser} from '../../context/UserContext';
import MainLayout from "@/components/layout/MainLayout.jsx";

const Settings = () => {
    const {user, setUser} = useUser();
    const [formData, setFormData] = useState(user);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUser(formData); // Update global user state
        alert('Profile updated!');
    };

    return (
        <MainLayout>
            <Container>
                <h2 className="mb-4">⚙️ Settings</h2>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label column={"sm"}>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label column={"sm"}>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label column={"sm"}>Avatar URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="avatar"
                                    value={formData.avatar}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Button type="submit" variant="primary">
                                Save Changes
                            </Button>
                        </Col>

                        <Col md={6} className="text-center">
                            <img
                                src={formData.avatar}
                                alt="Avatar"
                                className="rounded-circle shadow"
                                width={120}
                                height={120}
                            />
                            <p className="mt-2 text-muted">Live preview</p>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </MainLayout>
    );
};

export default Settings;
