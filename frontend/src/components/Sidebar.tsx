import React, { useEffect, useState } from 'react';
import { PieChartOutlined, ProductOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, ConfigProvider, Divider, Layout, Menu, theme } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import ThemeSelector from './ThemeSelector';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const SidebarLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const location = useLocation();
    const { t } = useTranslation();

    // Map current path to menu key
    const selectedKey = location.pathname.split('/')[2] || 'dashboard';


    const items: MenuItem[] = [
        getItem(<Link to="/dashboard">{t('dashboard')}</Link>, 'dashboard', <PieChartOutlined />),
        getItem(<Link to="/dashboard/products">{t('products')}</Link>, 'products', <ProductOutlined />),
        getItem(<Link to="/dashboard/users">{t('users')}</Link>, 'users', <UserOutlined />),
    ];

    const pathSnippets = location.pathname.split('/').filter((i) => i);
    const breadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        const title = t(pathSnippets[index]);
        return {
            key: url,
            title: <Link to={url}>{title}</Link>,
        };
    });

    const breadcrumbData = [{ key: 'home', title: <Link to="/home">{t('home')}</Link> }].concat(breadcrumbItems);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" style={{ margin: 16, textAlign: 'center' }}>
                </div>
                <Menu theme="dark" selectedKeys={[selectedKey]} mode="inline" items={items} />
                <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
                <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
                    <div style={{
                        paddingLeft: collapsed ? 0 : 16,
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center',
                        flexDirection: collapsed ? 'column' : 'row',
                        gap: collapsed ? 16 : 0
                    }}>
                        <LanguageSelector />
                        <ThemeSelector />
                    </div>
                </ConfigProvider>
            </Sider>
            <Layout>
                <Header style={{ padding: '0 16px', background: colorBgContainer }}>
                    <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumbData} />
                </Header>
                <Content style={{ margin: '16px' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    {t('ant_design_credits', { year: new Date().getFullYear() })}
                </Footer>
            </Layout>
        </Layout>
    );
};

export default SidebarLayout;
