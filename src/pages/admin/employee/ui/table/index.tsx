import {
    useDeleteEmployeeMutation,
    useGetAllEmployeesQuery,
} from '@/entities/employee/api';
import { IEmployee } from '@/entities/employee/model/types';
import { FlexBox, useAppSelector } from '@/shared';
import { Button, Image, message, Popconfirm, Table, TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { columnResponseText } from '@/shared/const/css';
import { FaInfo } from 'react-icons/fa';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AdminEmployeePageTable = () => {
    const { t } = useTranslation();
    const [deleteEmployee, { isSuccess: deleteSuccess }] =
        useDeleteEmployeeMutation();
    const { attendanceBranch } = useAppSelector();
    const { data, isLoading } = useGetAllEmployeesQuery(
        attendanceBranch !== undefined
            ? { branch_id: attendanceBranch }
            : { branch_id: undefined },
        { skip: attendanceBranch === undefined },
    );
    const navigate = useNavigate();
    useEffect(() => {
        if (deleteSuccess) {
            message.success(t('Успешно удалено'));
            navigate('/employees');
        }
    }, [deleteSuccess]);
    const columns: TableProps<IEmployee>['columns'] = [
        {
            title: t('Фото'),
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
                    <>{t("Фото отсутствует")}</>
                ),
        },
        {
            title: t('Имя'),
            dataIndex: 'full_name',
            className: `${columnResponseText}`,
        },
        {
            title: t('Должность'),
            dataIndex: 'position',
            render: (e) =>
                e.name === 'unknown' ? t('Должность не указана') : e.name,
            className: `${columnResponseText}`,
        },
        {
            title: t('Филиал'),
            dataIndex: 'branch',
            render: (e) => e.name,
            className: `${columnResponseText}`,
            responsive: ['md', 'lg', 'xl'],
        },
        {
            title: t('Рабочий график'),
            dataIndex: 'schedule',
            render: (el) => (
                <FlexBox cls="flex-col w-[200px]">{el.name}</FlexBox>
            ),
            className: `${columnResponseText}`,
            responsive: ['lg', 'xl'],
        },
        {
            title: t('Телефон'),
            dataIndex: 'phone',
            render: (item) => <div className="w-[150px]">{item}</div>,
            className: `${columnResponseText}`,
            responsive: ['md', 'lg', 'xl'],
        },
        {
            title: '',
            dataIndex: 'actions',
            render: (_, rec) => (
                <div className="flex gap-1 lg:gap-4">
                    <Button
                        type="primary"
                        onClick={() => navigate(`/employees/${rec.id}`)}
                        icon={<FaInfo />}
                        className="text-[12px] md:text-[14px]"
                    />
                    <Popconfirm
                        onConfirm={() => deleteEmployee(rec.id)}
                        className="text-2xl text-white bg-red-500 px-2 rounded-lg cursor-pointer"
                        title={t("Вы действительно хотите удалить сотрудника?")}
                    >
                        x
                    </Popconfirm>
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
