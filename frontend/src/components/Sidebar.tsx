import React, {useState} from 'react';
import {PieChartOutlined, ProductOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import {Link, Outlet, useLocation} from 'react-router-dom';

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

const items: MenuItem[] = [
    getItem(<Link to="/dashboard">Dashboard</Link>, 'dashboard', <PieChartOutlined/>),
    getItem(<Link to="/dashboard/products">Products</Link>, 'products', <ProductOutlined/>),
];

const SidebarLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const location = useLocation();

    // Map current path to menu key
    let selectedKey = 'dashboard';
    if (location.pathname.startsWith('/dashboard/products')) {
        selectedKey = 'products';
    } else if (location.pathname === '/dashboard') {
        selectedKey = 'dashboard';
    }

    const pathSnippets = location.pathname.split('/').filter((i) => i);
    const breadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        const title = pathSnippets[index].charAt(0).toUpperCase() + pathSnippets[index].slice(1);
        return {
            key: url,
            title: <Link to={url}>{title}</Link>,
        };
    });

    const breadcrumbData = [{key: 'home', title: <Link to="/">Home</Link>}].concat(breadcrumbItems);

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical"/>
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
