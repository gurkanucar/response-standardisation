import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Dashboard = () => {
    return (
        <Card>
            <Title level={2}>Dashboard Overview</Title>
            <Paragraph>
                This is a fake dashboard page. You can add widgets, charts, and other components here.
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

