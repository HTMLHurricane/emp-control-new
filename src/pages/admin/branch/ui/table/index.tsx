import {
    useDeleteBranchMutation,
    useGetBranchesInfoQuery,
} from '@/entities/branch/api';
import { IBranchesInfo, IBranchPatch } from '@/entities/branch/model/types';
import {
    DeleteButton,
    EditButton,
    useAppActions,
    useAppSelector,
} from '@/shared';
import { columnResponseText } from '@/shared/const/css';
import { Table, TableProps, message } from 'antd';
import { useEffect } from 'react';

const AdminBranchPageTable = () => {
    const { setBranchForm, setIsUpdatingBranch } = useAppActions();
    const { branchDate } = useAppSelector();
    const { data, isFetching } = useGetBranchesInfoQuery(branchDate);
    const [deleteBranch, { isSuccess: deleteSuccess, isError: deleteError }] =
        useDeleteBranchMutation();

    const handleEdit = (rec: IBranchPatch) => {
        setBranchForm({
            name: rec.name,
            id: rec.id,
            address: rec.address,
            is_active: rec.is_active,
        });
        setIsUpdatingBranch(true);
    };

    const columns: TableProps<IBranchesInfo>['columns'] = [
        {
            title: 'Название',
            dataIndex: 'name',
            className: `${columnResponseText}`,
        },
        {
            title: 'Локация',
            dataIndex: 'address',
            className: `${columnResponseText}`,
        },
        {
            title: 'Количество рабочих',
            dataIndex: 'total_employees',
            className: `${columnResponseText}`,
        },
        {
            title: 'Количество пришедших',
            dataIndex: 'present_employees',
            render: (el) => (
                <span className="hover:bg-gray-300 p-3 rounded-md transition-all cursor-pointer">
                    {el}
                </span>
            ),
            className: `${columnResponseText}`,
            responsive: ['md', 'lg', 'xl'],
        },
        {
            title: 'Количество опоздавших',
            dataIndex: 'late_employees',
            render: (el) => (
                <span className="hover:bg-gray-300 p-3 rounded-md transition-all cursor-pointer">
                    {el}
                </span>
            ),
            className: `${columnResponseText}`,
            responsive: ['lg', 'xl'],
        },
        {
            title: 'Количество отсутствующих',
            dataIndex: 'absent_employees',
            render: (el) => (
                <span className="hover:bg-gray-300 p-3 rounded-md transition-all cursor-pointer">
                    {el}
                </span>
            ),
            className: `${columnResponseText}`,
            responsive: ['md', 'lg', 'xl'],
        },
        {
            title: '',
            dataIndex: 'actions',
            render: (_, rec) => (
                <div className="flex flex-col md:flex-row gap-1 md:gap-2 lg:gap-4">
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

    useEffect(() => {
        if (deleteError) {
            message.error('Произошла ошибка во время удаления');
            console.log('error', deleteError);
        }
    }, [deleteError]);

    return (
        <Table
            loading={isFetching}
            scroll={{ x: true }}
            bordered
            columns={columns}
            rowKey={(el) => el.id}
            dataSource={data}
        />
    );
};

export { AdminBranchPageTable };
