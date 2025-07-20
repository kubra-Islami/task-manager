import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Container, Row, Col } from 'react-bootstrap';

const MainLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <Container fluid>
                <Row>
                    <Col xs={12} md={3} lg={2} className="p-0 sidebar-wrapper">
                        <Sidebar />
                    </Col>
                    <Col
                        xs={12}
                        md={9}
                        lg={10}
                        className="pt-5 mb-3"
                        style={{ paddingBottom: '80px' }} // prevent overlap on small screens
                    >
                        {children}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default MainLayout;
