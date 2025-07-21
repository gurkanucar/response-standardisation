import {useTranslation} from "react-i18next";
import {Button, Card, Col, Row, Space, Typography} from 'antd';
import {useNavigate} from "react-router-dom";

const {Title} = Typography;

function Home() {
    const {t} = useTranslation();
    const navigate = useNavigate();

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
            <Row justify="center">
                <Col span={16} style={{textAlign: 'center'}}>
                    <Card>
                        <Typography>
                            <Title>{t('welcome_to_home_page')}</Title>
                        </Typography>
                        <Space wrap size="large" style={{marginTop: 20}}>
                            <Button type="primary" onClick={() => navigate('/dashboard')}>
                                {t('dashboard')}
                            </Button>
                            <Button type="primary" onClick={() => navigate('/dashboard/products')}>
                                {t('products')}
                            </Button>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Home;