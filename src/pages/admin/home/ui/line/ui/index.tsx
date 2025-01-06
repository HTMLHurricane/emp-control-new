import { useGetLineDataQuery } from '@/entities/home/api';
import { Table, TableProps, Tag } from 'antd';
import { useState } from 'react';
import { useAppSelector, Card, Title } from '@/shared';
import { IDailyAttendance } from '@/entities/home/model';
import { useNavigate } from 'react-router-dom';
import { columnResponseText } from '@/shared/const/css';

// Функция для расчета разницы времени
export const calculateDelay = (actualTime?: string, scheduledTime?: string) => {
    if (!actualTime || !scheduledTime) return { hours: 0, minutes: 0 };

    const [actualHours, actualMinutes, actualSeconds] = actualTime
        .split(':')
        .map(Number);
    const [scheduledHours, scheduledMinutes, scheduledSeconds] = scheduledTime
        .split(':')
        .map(Number);

    const actualDate = new Date(
        0,
        0,
        0,
        actualHours,
        actualMinutes,
        actualSeconds,
    );
    const scheduledDate = new Date(
        0,
        0,
        0,
        scheduledHours,
        scheduledMinutes,
        scheduledSeconds,
    );

    const diffInMilliseconds = actualDate.getTime() - scheduledDate.getTime();

    const diffHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const diffMinutes = Math.floor(
        (diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
    );

    return { hours: Math.max(diffHours, 0), minutes: Math.max(diffMinutes, 0) };
};

const Line = () => {
    const { homeDate, collapsed, attendanceBranch } = useAppSelector();
    const [employeeTablePage, setEmployeeTablePage] = useState(1);
    const [employeeTableLimit, setEmployeeTableLimit] = useState(10);
    const navigate = useNavigate();

    const { data, isLoading } = useGetLineDataQuery(
        {
            date: homeDate.format('YYYY-MM-DD'),
            branch_id: attendanceBranch,
            page: employeeTablePage,
            page_size: employeeTableLimit,
        },
        { skip: attendanceBranch === undefined },
    );

    const columns: TableProps<IDailyAttendance>['columns'] = [
        {
            title: 'ФИО',
            key: 'full_name',
            dataIndex: 'full_name',
            className: `${columnResponseText} w-[100px] md:w-[200px]`,
        },
        {
            title: 'Должность',
            key: 'position',
            dataIndex: 'position',
            render: (_, res) => <Tag>{res.position_name}</Tag>,
            responsive: ['md', 'lg', 'xl'],
            className: `${columnResponseText}`,
        },
        {
            title: 'Филиал',
            key: 'branch',
            dataIndex: 'branch',
            render: (_, res) => <Tag>{res.branch_name}</Tag>,
            responsive: ['md', 'lg', 'xl'],
            className: `${columnResponseText}`,
        },
        {
            title: 'Пришел',
            key: 'time_in',
            dataIndex: 'time_in',
            render: (item) => (
                <Tag color={'green'}>
                    {item ? `${item?.slice(0, 5)} ч` : ''}
                </Tag>
            ),
            className: `${columnResponseText}`,
        },
        {
            title: 'Опоздал',
            key: 'delay',
            render: (_, res) => {
                const delay = calculateDelay(res.time_in, res.time_schedule_in);
                return (
                    <Tag color={'red'}>
                        {delay.hours} ч {delay.minutes} м
                    </Tag>
                );
            },
            className: `${columnResponseText}`,
        },
    ];

    return (
        <Card className={`text-center ${collapsed ? '' : 'xl:w-[800px]'}`}>
            <Title>Общая активность за {homeDate.format('YYYY-MM-DD')}</Title>
            <Table
                dataSource={data?.content || []}
                rowKey={(row) => row.id}
                loading={isLoading}
                size="small"
                columns={columns}
                scroll={{ x: 'max-content', y: 300 }}
                pagination={{
                    showSizeChanger: true,
                    current: employeeTablePage,
                    pageSize: employeeTableLimit,
                    total: data?.total_elements,
                    onChange: (page, limit) => {
                        setEmployeeTablePage(page);
                        setEmployeeTableLimit(limit);
                    },
                }}
                onRow={(rec) => ({
                    onClick: () => navigate(`employees/${rec.id}`),
                    className: 'hover:cursor-pointer',
                })}
                className="mt-4 w-full sm:w-full md:w-auto lg:w-auto xl:w-auto"
            />
        </Card>
    );
};

export { Line };
