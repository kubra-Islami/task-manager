import React, {useState} from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import {useUser} from '../../context/UserContext';
import MainLayout from "@/components/layout/MainLayout.jsx";
import { useTheme } from '@/Context/ThemeContext.jsx';

const Settings = () => {
    const {user, setUser} = useUser();
    // const [formData, setFormData] = useState(user);
    const { theme, toggleTheme } = useTheme();
    const [formData, setFormData] = useState({
        ...user,
        reminders: user.reminders ?? true,
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUser(formData);
        alert('Profile updated!');
    };


    return (
        <MainLayout>
            <Container className="theme-card mt-5 p-4 rounded shadow-sm">
                <h2 className="mb-4">⚙️ Edit Profile</h2>
                <Form onSubmit={handleSubmit}
                >
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
                                    type="file"
                                    name="avatar"
                                    // value={formData.avatar}
                                    // onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="switch"
                                    id="theme-toggle"
                                    label="Enable Dark Mode"
                                    checked={theme === 'dark'}
                                    onChange={toggleTheme}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
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
