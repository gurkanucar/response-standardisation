import { Card, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph } = Typography;

const Dashboard = () => {
    const { t } = useTranslation();
    return (
        <Card>
            <Title level={2}>{t('dashboard')}</Title>
            <Paragraph>
                {t('welcome')}
            </Paragraph>
            <Paragraph>
                - Widget 1: Fake data
                <br />
                - Widget 2: More fake data
                <br />
                - Widget 3: Even more fake data
            </Paragraph>
        </Card>
    );
};

export default Dashboard;
