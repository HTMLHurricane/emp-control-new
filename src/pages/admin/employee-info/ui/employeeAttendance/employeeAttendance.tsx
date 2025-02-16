import { useGetDailyAttendanceByIdQuery } from '@/entities/employee-info/api';
import { IDailyAttendanceById } from '@/entities/employee-info/model';
import { TableProps, Table, Image, Empty, Spin } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const EmployeeAttendance = () => {
    const { t } = useTranslation();
    const [employeeTablePage, setEmployeeTablePage] = useState(1);
    const [employeeTableLimit, setEmployeeTableLimit] = useState(10);
    const { id } = useParams();
    const { data, isLoading } = useGetDailyAttendanceByIdQuery(
        {
            employee_id: id,
            page: employeeTablePage,
            page_size: employeeTableLimit,
        },
        { skip: id === undefined },
    );

    const columns: TableProps<IDailyAttendanceById>['columns'] = [
        {
            title: t('День'),
            dataIndex: 'created_at',
            render: (item) => <>{item.split('T')[0]}</>,
            className: 'w-[120px]',
        },
        {
            title: t('Пришёл(а)'),
            dataIndex: 'time_in',
            render: (item) => <>в {item?.slice(0, 5)}</>,
            className: 'w-[120px]',
        },
        {
            title: t('Фото прихода'),
            dataIndex: 'attendance_in',
            render: (_, res) => (
                <div className="flex flex-wrap gap-2">
                    <Image
                        src={res?.attendance_in?.url}
                        width={150}
                        height={100}
                    />
                </div>
            ),
            className: 'w-[100px]',
        },
        {
            title: t('Опоздал(а)'),
            dataIndex: 'late',
            render: (item) => (
                <>
                    {t('на')} {item?.slice(0, 4)} ч
                </>
            ),
        },
        {
            title: t('Ранний уход'),
            dataIndex: 'early',
            render: (item) => <>{item}</>,
        },
        {
            title: t('Ушёл(а)'),
            dataIndex: 'time_out',
            render: (item) => (
                <>{item ? `${t('в')} ${item.slice(0, 5)}` : ''}</>
            ),
        },
        {
            title: t('Фото ухода'),
            dataIndex: 'attendance_out',
            render: (_, res) => (
                <div className="flex flex-wrap gap-2">
                    <Image
                        src={res?.attendance_out?.url}
                        width={150}
                        height={100}
                    />
                </div>
            ),
            className: 'w-[100px]',
        },
    ];

    if (isLoading) {
        return <Spin />;
    }
    if (!data) {
        return (
            <div className="flex justify-center items-center">
                <Empty description={t("Данные не найдены")} />
            </div>
        );
    }
    return (
        <div>
            <Table
                loading={isLoading}
                scroll={{ x: true }}
                bordered
                columns={columns}
                dataSource={data.content}
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
                rowKey={() => Math.random()}
            />
        </div>
    );
};

export { EmployeeAttendance };
