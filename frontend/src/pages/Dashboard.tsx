import {useTranslation} from "react-i18next";
import {Card, Col, Row, Typography} from 'antd';

const {Title} = Typography;

function Dashboard() {
    const {t} = useTranslation();
    return (
        <div style={{padding: '50px', minHeight: '100vh'}}>
            <Row justify="center">
                <Col span={16}>
                    <Card>
                        <Typography>
                            <Title>{t('welcome_to_dashboard_page')}</Title>
                        </Typography>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Dashboard;
