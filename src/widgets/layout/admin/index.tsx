import { Button, Layout } from 'antd';
import { FC, useEffect } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaBuildingUser } from 'react-icons/fa6';
import { VscGraphLine } from 'react-icons/vsc';
import { TOKEN, TOKEN_KEY, useAppActions, useAppSelector } from '@/shared';
import { useCheckUserQuery } from '@/entities/auth/api';
import { LuLogOut } from 'react-icons/lu';
import { LangSwitcher } from '@/shared/ui/langSwitcher/LangSwitcher';
import { useTranslation } from 'react-i18next';

type MenuItem = Required<MenuProps>['items'][number];
const { Content, Sider } = Layout;

const AdminLayout: FC = () => {
    const { t } = useTranslation();
    const { collapsed } = useAppSelector();
    const { setCollapsed } = useAppActions();
    const { data, isError } = useCheckUserQuery(TOKEN.get() as string);
    const navigate = useNavigate();

    const items: MenuItem[] = [
        {
            key: '1',
            label: <Link to="/">{t('Управление')}</Link>,
            icon: <FaBuildingUser />,
            children: [
                { key: '14', label: <Link to="/">{t('Главная')}</Link> },
                {
                    key: '5',
                    label: <Link to="/employees">{t('Сотрудники')}</Link>,
                },
                { key: '6', label: <Link to="/branches">{t('Филиалы')}</Link> },
                { key: '7', label: <Link to="/roles">{t('Роли')}</Link> },
                {
                    key: '8',
                    label: <Link to="/schedules">{t('Рабочий график')}</Link>,
                },
            ],
        },
        {
            key: '2',
            label: <Link to="/count">{t('Анализ клиентов')}</Link>,
            icon: <VscGraphLine />,
            children: [
                { key: '9', label: <Link to="/count">{t('Статистика')}</Link> },
                // { key: '10', label: <Link to="/top_clients">{t('Топ клиенты')}</Link> },
            ],
        },
    ];

    const itemsAdmin: MenuItem[] = [
        {
            key: '1',
            label: <Link to="/">{t('Управление')}</Link>,
            icon: <FaBuildingUser />,
            children: [
                { key: '14', label: <Link to="/">{t('Главная')}</Link> },
                { key: '16', label: <Link to="/device">{t('Камеры')}</Link> },
                {
                    key: '15',
                    label: <Link to="/organizations">{t('Организации')}</Link>,
                },
                {
                    key: '5',
                    label: <Link to="/employees">{t('Сотрудники')}</Link>,
                },
                { key: '6', label: <Link to="/branches">{t('Филиалы')}</Link> },
                { key: '7', label: <Link to="/roles">{t('Роли')}</Link> },
                {
                    key: '8',
                    label: <Link to="/schedules">{t('Рабочий график')}</Link>,
                },
            ],
        },
        {
            key: '2',
            label: <Link to="/count">{t('Анализ клиентов')}</Link>,
            icon: <VscGraphLine />,
            children: [
                { key: '9', label: <Link to="/count">{t('Статистика')}</Link> },
                {
                    key: '10',
                    label: <Link to="/top_clients">{t('Топ клиенты')}</Link>,
                },
            ],
        },
    ];

    useEffect(() => {
        if (isError) {
            navigate('/login'); // Перенаправляем на /login
        }
    }, []);
    const onLogout = () => {
        TOKEN.remove(TOKEN_KEY); // Удаляем токен
        navigate('/login');
    };
    const handleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout className="relative h-screen overflow-hidden">
            {/* Sidebar - Responsive width based on screen size */}
            <Sider
                theme="light"
                width={250}
                collapsedWidth={50}
                collapsed={collapsed}
                breakpoint="lg"
                className="fixed h-full sm:w-16 md:w-20 lg:w-60 xl:w-72 z-50"
            >
                <div className="flex justify-center items-center text-slate-950 text-xl pt-5 pb-1">
                    <Link to="/" className="text-start mr-2">
                        {collapsed ? 'A' : 'AralHUB'}
                    </Link>
                    {!collapsed && <LangSwitcher />}
                </div>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="light"
                    items={data?.is_admin ? itemsAdmin : items}
                />
                <div className="flex flex-col absolute bottom-0 w-full">
                    <Button
                        icon={!collapsed && <LuLogOut />}
                        onClick={onLogout}
                        type="link"
                        className="text-slate-950 py-8"
                    >
                        {collapsed ? <LuLogOut /> : t('Выйти')}
                    </Button>
                    <Button
                        onClick={handleCollapsed}
                        className="bg-transparent text-slate-950 hover:!bg-transparent hover:!text-slate-950 border-none w-full pb-8"
                    >
                        {collapsed ? <FaArrowRight /> : <FaArrowLeft />}
                    </Button>
                </div>
            </Sider>

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
