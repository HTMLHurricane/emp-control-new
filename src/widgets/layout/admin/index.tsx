import { Button, Layout } from 'antd';
import { FC } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaBuildingUser } from 'react-icons/fa6';
import { VscGraphLine } from 'react-icons/vsc';
import { TOKEN, useAppActions, useAppSelector } from '@/shared';
import { useCheckUserQuery } from '@/entities/auth/api';

type MenuItem = Required<MenuProps>['items'][number];
const { Content, Sider } = Layout;
const items: MenuItem[] = [
    {
        key: '1',
        label: <Link to="/">Управление</Link>,
        icon: <FaBuildingUser />,
        children: [
            { key: '14', label: <Link to="/">Главная</Link> },
            { key: '5', label: <Link to="/employees">Сотрудники</Link> },
            { key: '6', label: <Link to="/branches">Филиалы</Link> },
            { key: '7', label: <Link to="/roles">Роли</Link> },
            {
                key: '8',
                label: <Link to="/schedules">Рабочий график</Link>,
            },
        ],
    },
    {
        key: '2',
        label: <Link to="/count">Анализ клиентов</Link>,
        icon: <VscGraphLine />,
        children: [
            { key: '9', label: <Link to="/count">Статистика</Link> },
            { key: '10', label: <Link to="/top_clients">Топ клиенты</Link> },
        ],
    },
];
const itemsAdmin: MenuItem[] = [
    {
        key: '1',
        label: <Link to="/">Управление</Link>,
        icon: <FaBuildingUser />,
        children: [
            { key: '14', label: <Link to="/">Главная</Link> },
            { key: '16', label: <Link to="/device">Камеры</Link> },
            {
                key: '15',
                label: <Link to="/organizations">Организации</Link>,
            },
            { key: '5', label: <Link to="/employees">Сотрудники</Link> },
            { key: '6', label: <Link to="/branches">Филиалы</Link> },
            { key: '7', label: <Link to="/roles">Роли</Link> },
            {
                key: '8',
                label: <Link to="/schedules">Рабочий график</Link>,
            },
        ],
    },
    {
        key: '2',
        label: <Link to="/count">Анализ клиентов</Link>,
        icon: <VscGraphLine />,
        children: [
            { key: '9', label: <Link to="/count">Статистика</Link> },
            { key: '10', label: <Link to="/top_clients">Топ клиенты</Link> },
        ],
    },
];

const AdminLayout: FC = () => {
    const { collapsed } = useAppSelector();
    const { setCollapsed } = useAppActions();
    const { data } = useCheckUserQuery(TOKEN.get() as string);

    const handleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout className="relative h-screen overflow-hidden">
            {/* Sidebar - Responsive width based on screen size */}
            <Sider
                theme="dark"
                width={250}
                collapsedWidth={50}
                collapsed={collapsed}
                breakpoint="lg"
                className="fixed h-full sm:w-16 md:w-20 lg:w-60 xl:w-72 z-50"
            >
                <div className="text-center text-white text-2xl py-5">
                    <Link to="/">{collapsed ? 'A' : 'AralHUB'}</Link>
                </div>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    items={data?.is_admin ? itemsAdmin : items}
                />
                <Button
                    onClick={handleCollapsed}
                    className="bg-transparent text-white hover:!bg-transparent hover:!text-white border-none w-full absolute bottom-0 py-8"
                >
                    {collapsed ? <FaArrowRight /> : <FaArrowLeft />}
                </Button>
            </Sider>

            {/* Main Layout Content - Adjust margin based on sidebar visibility and screen size */}
            <Layout>
                <Content
                    className={`relative transition-all duration-300 ${
                        collapsed ? 'ml-[10px]' : 'ml-[0px]'
                    } md:ml-[0px] h-screen overflow-hidden`}
                >
                    <div className="p-2 h-full overflow-y-auto custom-scroll xl:p-5 bg-white rounded-lg shadow-sm">
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export { AdminLayout };
