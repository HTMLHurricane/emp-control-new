import { useGetEmployeeDeviceAttendancesByIdQuery } from '@/entities/employee-info/api';
import { AttendanceEmployeeDetailsById } from '@/entities/employee-info/model';
import { TableProps, Table, Image } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const EmployeeDevices = () => {
    const [employeeTablePage, setEmployeeTablePage] = useState(1);
    const [employeeTableLimit, setEmployeeTableLimit] = useState(10);
    const { id } = useParams();
    const { data, isLoading } = useGetEmployeeDeviceAttendancesByIdQuery(
        {
            employee_id: id,
            page: employeeTablePage,
            page_size: employeeTableLimit,
        },
        { skip: id === undefined },
    );

    const columns: TableProps<AttendanceEmployeeDetailsById>['columns'] = [
        {
            title: 'Камера',
            dataIndex: 'device',
            render: (_, res) => <>{res.device.name}</>,
        },
        {
            title: 'Det score',
            dataIndex: 'score',
            render: (item) => <>{item.toFixed(2)}%</>,
        },
        // {
        //     title: 'Длительность',
        //     dataIndex: 'device',
        //     render: (_, res) => <>{}</>
        // },
        {
            title: 'Филиал',
            dataIndex: 'device',
            render: (_, res) => <>{res.device.branch.name}</>,
        },
        {
            title: 'Адрес',
            dataIndex: 'device',
            render: (_, res) => <>{res.device.branch.address}</>,
        },
        {
            title: 'Фото',
            dataIndex: 'url',
            render: (url) => (
                <div className="flex flex-wrap gap-2">
                    <Image src={url} width={150} height={100} />
                </div>
            ),
            className: 'w-[100px]',
        },
    ];

    return (
        <Table
            loading={isLoading}
            scroll={{ x: true, y: 400 }}
            bordered
            columns={columns}
            dataSource={data?.content}
            pagination={{
                showSizeChanger: true,
                current: employeeTablePage,
                pageSize: employeeTableLimit,
                total: data?.total_pages,
                onChange: (page, limit) => {
                    setEmployeeTablePage(page);
                    setEmployeeTableLimit(limit);
                },
            }}
            rowKey={() => Math.random()}
        />
    );
};
