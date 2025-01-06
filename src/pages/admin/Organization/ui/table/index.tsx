import {
    useDeleteOrganizationMutation,
    useGetOrganizationQuery,
} from '@/entities/organization/api';
import { DeleteButton, EditButton, FlexBox, useAppActions } from '@/shared';
import { columnResponseText } from '@/shared/const/css';
import { IdName } from '@/shared/types/Types';
import { message, Table, TableProps } from 'antd';
import { useEffect } from 'react';

export const OrganizationTable = () => {
    const { setOrganizationForm, setIsUpdatingOrganization } = useAppActions();
    const { data, isLoading } = useGetOrganizationQuery();
    const [deleteOrganization, { isSuccess: deleteSuccess }] =
        useDeleteOrganizationMutation();

    const handleEdit = (res: IdName) => {
        setOrganizationForm({
            name: res.name,
            id: res.id,
        });
        setIsUpdatingOrganization(true);
    };

    const columns: TableProps<IdName>['columns'] = [
        {
            key: 'name',
            title: 'Название',
            dataIndex: 'name',
            className: `${columnResponseText}`,
        },
        {
            key: 'actions',
            title: '',
            dataIndex: 'actions',
            render: (_, rec) => (
                <FlexBox>
                    {rec.name !== 'unknown' && (
                        <>
                            <DeleteButton
                                onConfirm={() => deleteOrganization(rec.id)}
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
            message.success('Успешно удалено');
        }
    }, [deleteSuccess]);

    return (
        <Table
            loading={isLoading}
            scroll={{ x: true }}
            bordered
            columns={columns}
            rowKey={(el) => el.id!}
            dataSource={data ?? []}
            className="mt-5"
        />
    );
};
