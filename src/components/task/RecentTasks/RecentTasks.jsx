import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { BsCheckCircleFill, BsClockHistory, BsExclamationCircleFill } from 'react-icons/bs';
import './RecentTasks.css';
import {useTasks} from "@/Context/TaskContext.jsx"; // your custom styles

const RecentTasks = () => {
    const { tasks } = useTasks();
    const recentTasks = [...tasks].slice(-3).reverse();


    const getStatusIcon = (status) => {

        const baseIconStyle = {
            padding: '20px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,0.05)',
        };
        switch (status) {
            case 'done':
                return <BsCheckCircleFill style={{ ...baseIconStyle, color: 'limegreen' }} />;
            case 'pending':
                return <BsClockHistory style={{ ...baseIconStyle, color: 'orange' }} />;
            case 'in-progress':
                return <BsExclamationCircleFill style={{ ...baseIconStyle, color: '#0fc6c6' }} />;
            default:
                return <BsClockHistory style={{ ...baseIconStyle, color: 'gray' }} />;
        }

    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'todo':
                return 'status-badge todo';
            case 'in-progress':
                return 'status-badge in-progress';
            case 'cancelled':
                return 'status-badge cancelled';
            case 'On-Hold':
                return 'status-badge on-hold';
            case 'done':
                return 'status-badge done';
            default:
                return 'status-badge';
        }
    };


    return (
        <Card className="recent-tasks-card animate-fade-in">
            <Card.Title className="fs-4 fw-bold mb-3 theme-text">🆕 Recent Tasks</Card.Title>
            <ListGroup variant="flush">
                {recentTasks.length === 0 ? (
                    <ListGroup.Item className="text-muted no-task-msg">
                        No recent tasks available.
                    </ListGroup.Item>
                ) : (
                    recentTasks.map(task => (
                        <ListGroup.Item key={task.id} className="recent-task-item d-flex align-items-center">
                            <div className="d-flex align-items-center gap-3 flex-grow-1 justify-content-between">
                                <div className="d-flex align-items-center gap-3">
                                    {getStatusIcon(task.status)}
                                    <div className="text-truncate task-info">
                                       <span className="fw-semibold">
                                          {typeof task.title === 'string' ? task.title : JSON.stringify(task.title)}
                                       </span>
                                        {/*<span className="fw-semibold">{task.title}</span><br />*/}
                                        <small className="text-muted">
                                            Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}
                                        </small>
                                    </div>
                                </div>
                                {/* Custom Status Badge */}
                                <span className={getStatusBadgeClass(task.status)}>
                                    {task.status.replace('-', ' ')}
                                </span>
                            </div>
                        </ListGroup.Item>
                    ))
                )}
            </ListGroup>
        </Card>
    );
};

export default RecentTasks;
