import {Card, Col, Row, Typography,} from 'antd';

const {Title} = Typography;

function Products() {
    return (
        <div style={{padding: '50px', background: '#f0f2f5', minHeight: '100vh'}}>
            <Row justify="center">
                <Col span={16}>
                    <Card>
                        <Typography>
                            <Title>Welcome to the Products Page</Title>
                        </Typography>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Products;