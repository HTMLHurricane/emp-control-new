import {
    useDeleteRoleMutation,
    useGetAllRolesQuery,
} from '@/entities/role/api';
import {
    DeleteButton,
    EditButton,
    FlexBox,
    useAppActions,
} from '@/shared';
import { columnResponseText } from '@/shared/const/css';
import { IdName } from '@/shared/types/Types'
import { Table, TableProps, message } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next'

const AdminRolePageTable = () => {
    const {t} = useTranslation()
    const {
        setRoleForm,
        setIsUpdatingRole,
    } = useAppActions();
    const { data, isLoading } = useGetAllRolesQuery();
    const [deleteBranch, { isSuccess: deleteSuccess }] =
        useDeleteRoleMutation();

    const handleEdit = (rec: IdName) => {
        setRoleForm({
            name: rec.name,
            id: rec.id,
        });
        setIsUpdatingRole(true);
    };

    const columns: TableProps<IdName>['columns'] = [
        {
            title: t('Название'),
            dataIndex: 'name',
            className: `${columnResponseText}`,
        },
        {
            title: '',
            dataIndex: 'actions',
            render: (_, rec) => (
                <FlexBox>
                    {rec.name !== 'unknown' && (
                        <>
                            <DeleteButton
                                onConfirm={() => deleteBranch(rec.id)}
                            />
                            <EditButton onClick={() => handleEdit(rec)} />
                        </>
                    )}
                </FlexBox>
            ),
            className: `${columnResponseText}`,
        },
    ];

    useEffect(() => {
        if (deleteSuccess) {
            message.success(t('Успешно удалено'));
        }
    }, [deleteSuccess]);

    return (
        <Table
            loading={isLoading}
            scroll={{ x: true }}
            bordered
            columns={columns}
            rowKey={(el) => el.id}
            dataSource={data?.filter((el) => el.name !== 'unknown')}
        />
    );
};

export { AdminRolePageTable };
