import {
    useDeleteEmployeeMutation,
    useGetAllEmployeesQuery,
} from '@/entities/employee/api';
import { IEmployee } from '@/entities/employee/model/types';
import {
    DeleteButton,
    EditButton,
    FlexBox,
    useAppActions,
    useAppSelector,
} from '@/shared';
import { Button, Image, Table, TableProps, message } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa6';
import { columnResponseText } from '@/shared/const/css';

const AdminEmployeePageTable = () => {
    const { attendanceBranch } = useAppSelector();
    const { setEmployeeForm, setIsUpdatingEmployee } = useAppActions();
    const navigate = useNavigate();
    const { data, isFetching } = useGetAllEmployeesQuery(
        attendanceBranch !== undefined
            ? { branch_id: attendanceBranch }
            : { branch_id: undefined },
        { skip: attendanceBranch === undefined },
    );
    const [deleteBranch, { isSuccess: deleteSuccess }] =
        useDeleteEmployeeMutation();

    const handleEdit = (rec: IEmployee) => {
        setEmployeeForm({
            id: rec.id,
            first_name: rec.first_name,
            last_name: rec.last_name,
            phone: rec.phone,
            branch_id: rec.branch.id,
            position_id: rec.position.id,
            schedule_id: rec.schedule.id,
        });
        setIsUpdatingEmployee(true);
    };

    const columns: TableProps<IEmployee>['columns'] = [
        {
            title: 'Фото',
            key: 'first_image',
            dataIndex: 'first_image',
            className: `${columnResponseText}`,
            render: (_, res) => (
                <Image
                    src={res.first_image.url}
                    alt={`employee`}
                    width={100}
                    height={100}
                    className="rounded-full cursor-pointer"
                    preview={{ mask: null }}
                />
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
                    <DeleteButton onConfirm={() => deleteBranch(rec.id)} />
                    <EditButton onClick={() => handleEdit(rec)} />
                </div>
            ),
            className: `${columnResponseText}`,
        },
    ];

    useEffect(() => {
        if (deleteSuccess) {
            message.success('Успешно удалено');
        }
    }, [deleteSuccess]);

    return (
        <Table
            loading={isFetching}
            scroll={{ x: true }}
            bordered
            columns={columns}
            rowKey={(el) => el.id}
            dataSource={data}
            // pagination={{
            //     showSizeChanger: true,
            //     current: employeeTablePage,
            //     pageSize: employeeTableLimit,
            //     total: data?.total,
            //     onChange: (page, limit) => {
            //         setEmployeeTablePage(page);
            //         setEmployeeTableLimit(limit);
            //     },
            // }}
            className="mt-2"
        />
    );
};

export { AdminEmployeePageTable };
