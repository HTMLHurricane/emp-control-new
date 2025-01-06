import { useGetAllEmployeesQuery } from '@/entities/employee/api';
import { IEmployee } from '@/entities/employee/model/types';
import { FlexBox, useAppSelector } from '@/shared';
import { Button, Image, Table, TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa6';
import { columnResponseText } from '@/shared/const/css';

const AdminEmployeePageTable = () => {
    const { attendanceBranch } = useAppSelector();
    const { data, isLoading } = useGetAllEmployeesQuery(
        attendanceBranch !== undefined
            ? { branch_id: attendanceBranch }
            : { branch_id: undefined },
        { skip: attendanceBranch === undefined },
    );
    const navigate = useNavigate();

    const columns: TableProps<IEmployee>['columns'] = [
        {
            title: 'Фото',
            key: 'first_image',
            dataIndex: 'first_image',
            className: `${columnResponseText}`,
            render: (_, res) =>
                res.first_image ? (
                    <Image
                        src={res.first_image.url}
                        alt={`employee`}
                        width={100}
                        height={100}
                        className="rounded-full cursor-pointer"
                        preview={{ mask: null }}
                    />
                ) : (
                    <>Фото отсутствует</>
                ),
        },
        {
            title: 'Имя',
            dataIndex: 'full_name',
            className: `${columnResponseText}`,
        },
        {
            title: 'Должность',
            dataIndex: 'position',
            render: (e) =>
                e.name === 'unknown' ? 'Должность не указана' : e.name,
            className: `${columnResponseText}`,
        },
        {
            title: 'Подразделение',
            dataIndex: 'branch',
            render: (e) => e.name,
            className: `${columnResponseText}`,
            responsive: ['md', 'lg', 'xl'],
        },
        {
            title: 'Рабочий график',
            dataIndex: 'schedule',
            render: (el) => (
                <FlexBox cls="flex-col w-[200px]">{el.name}</FlexBox>
            ),
            className: `${columnResponseText}`,
            responsive: ['lg', 'xl'],
        },
        {
            title: 'Телефон',
            dataIndex: 'phone',
            render: (item) => <div className="w-[150px]">{item}</div>,
            className: `${columnResponseText}`,
            responsive: ['md', 'lg', 'xl'],
        },
        {
            title: '',
            dataIndex: 'actions',
            render: (_, rec) => (
                <div className="flex gap-1 lg:gap-2">
                    <Button
                        type="primary"
                        onClick={() => navigate(`/employees/${rec.id}`)}
                        icon={<FaEye />}
                        className="text-[12px] md:text-[14px]"
                    />
                </div>
            ),
            className: `${columnResponseText}`,
        },
    ];

    return (
        <Table
            loading={isLoading}
            scroll={{ x: true }}
            bordered
            columns={columns}
            rowKey={(el) => el.id}
            dataSource={data ?? []}
            pagination={{ pageSize: 10 }}
            className="mt-2"
        />
    );
};

export { AdminEmployeePageTable };
