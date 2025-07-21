import React, {useState} from 'react';
import {PieChartOutlined, ProductOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import {Link, Outlet, useLocation} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import ThemeSelector from './ThemeSelector';

const {Header, Content, Footer, Sider} = Layout;

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
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const location = useLocation();
    const { t } = useTranslation();

    // Map current path to menu key
    let selectedKey = 'dashboard';
    if (location.pathname.startsWith('/dashboard/products')) {
        selectedKey = 'products';
    } else if (location.pathname === '/dashboard') {
        selectedKey = 'dashboard';
    }

    const items: MenuItem[] = [
        getItem(<Link to="/dashboard">{t('dashboard')}</Link>, 'dashboard', <PieChartOutlined/>),
        getItem(<Link to="/dashboard/products">{t('products')}</Link>, 'products', <ProductOutlined/>),
    ];

    const pathSnippets = location.pathname.split('/').filter((i) => i);
    const breadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        let title = pathSnippets[index];
        if (title === 'dashboard') title = t('dashboard');
        else if (title === 'products') title = t('products');
        else if (title === 'users') title = t('users');
        else if (title === '') title = t('home');
        else title = title.charAt(0).toUpperCase() + title.slice(1);
        return {
            key: url,
            title: <Link to={url}>{title}</Link>,
        };
    });

    const breadcrumbData = [{key: 'home', title: <Link to="/">{t('home')}</Link>}].concat(breadcrumbItems);

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" style={{margin: 16}}/>
                <div style={{padding: 16, textAlign: 'center'}}>
                    <LanguageSelector />
                    <ThemeSelector />
                </div>
                <Menu theme="dark" selectedKeys={[selectedKey]} mode="inline" items={items}/>
            </Sider>
            <Layout>
                <Header style={{padding: 0, background: colorBgContainer}}/>
                <Content style={{margin: '0 16px'}}>
                    <Breadcrumb style={{margin: '16px 0'}} items={breadcrumbData}/>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default SidebarLayout;
