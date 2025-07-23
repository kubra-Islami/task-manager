import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";  // <-- import
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import './auth.css';

export default function Login() {
    const { register, handleSubmit } = useForm();
    const { login, user: authUser } = useAuth();
    const { setUser } = useUser(); // get setUser to update UserContext
    const navigate = useNavigate();

    useEffect(() => {
        if (authUser) {
            navigate("/welcome");
        }
    }, [authUser, navigate]);
    const onSubmit = (data) => {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.email === data.email && storedUser.password === data.password) {
            login(storedUser);
            setUser(storedUser);
            navigate("/welcome");
        } else {
            alert("Invalid email or password");
        }
    };


    // const onSubmit = async (data) => {
    //     try {
    //         const response = await fetch('http://localhost:3000/api/login', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 email: data.email,
    //                 password: data.password,
    //             }),
    //         });
    //
    //         if (!response.ok) {
    //             const error = await response.text();
    //             console.log(`Login failed: ${error}`);
    //             return;
    //         }
    //
    //         const user = await response.json();
    //         login(user);
    //         setUser(user);
    //         navigate('/welcome');
    //     } catch (err) {
    //         console.error(err);
    //         console.log('Something went wrong.');
    //     }
    // };


    return (
        <Container className="auth-container">
            <Row className="justify-content-center w-100">
                <Col xs={12} md={8} lg={6}>
                    <Card className="auth-card">
                        <Card.Body>
                            <h3 className="text-center mb-4">Welcome Back</h3>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        {...register("email")}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        {...register("password")}
                                        required
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100">
                                    Login
                                </Button>

                                <div className="text-center mt-3">
                                    <small>
                                        Don’t have an account?{" "}
                                        <Link to="/Register" className="text-primary">Register</Link>
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
