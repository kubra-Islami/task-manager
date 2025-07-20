import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "./auth.css";

export default function Register() {
    const { register: formRegister, handleSubmit } = useForm();
    const { login, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/welcome");
        }
    }, [user, navigate]);

    const onSubmit = (data) => {
        login(data.email); // Simulate login
        navigate("/welcome");
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row className="w-100 justify-content-center">
                <Col xs={12} sm={10} md={8} lg={6}>
                    <Card className="shadow rounded">
                        <Card.Body>
                            <h3 className="text-center mb-4">Create an Account</h3>
                            <Form onSubmit={handleSubmit(onSubmit)}>

                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your name"
                                        {...formRegister("name")}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        {...formRegister("email")}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Create a password"
                                        {...formRegister("password")}
                                        required
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100">
                                    Register
                                </Button>

                                <div className="text-center mt-3">
                                    <small>
                                        Already have an account? <Link to="/login">Login</Link>
                                    </small>
                                </div>

                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
