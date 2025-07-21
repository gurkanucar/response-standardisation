import {Link} from 'react-router-dom';
import {Button, Card, Col, Row, Space, Typography} from 'antd';

const {Title, Paragraph} = Typography;

function Home() {
    return (
        <div style={{padding: '50px', background: '#f0f2f5', minHeight: '100vh'}}>
            <Row justify="center">
                <Col span={16}>
                    <Card>
                        <Typography>
                            <Title>Welcome to the Admin Panel</Title>
                            <Paragraph>
                                This is the central hub for managing your application. You can navigate to different
                                sections using the buttons below.
                            </Paragraph>
                        </Typography>
                        <Space wrap size="large">
                            <Button type="primary">
                                <Link to="/dashboard/products">Dashboard Products</Link>
                            </Button>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Home; 