import {
    useDeleteDeviceMutation,
    useGetDevicesQuery,
} from '@/entities/device/api';
import { Device } from '@/entities/device/model/types';
import { FlexBox, DeleteButton, EditButton, useAppActions } from '@/shared';
import { message, Table, TableProps } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next'

export const DeviceTable = () => {
    const {t} = useTranslation()
    const { setDeviceForm, setIsUpdatingDevice } = useAppActions();
    const { data, isLoading } = useGetDevicesQuery();
    const [deleteDevice, { isSuccess }] = useDeleteDeviceMutation();

    const handleEdit = (res: Device) => {
        setDeviceForm({
            device_id: res.id,
            id: res.id,
            is_active: res.is_active,
            name: res.name,
            path: res.path,
        });
        setIsUpdatingDevice(true);
    };

    useEffect(() => {
        if (isSuccess) {
            message.success(t('Успешно удалено'));
        }
    }, [isSuccess]);

    const columns: TableProps<Device>['columns'] = [
        {
            key: 'id',
            title: t('ID Камеры'),
            dataIndex: 'id',
        },
        {
            key: 'name',
            title: t('Камера'),
            dataIndex: 'name',
        },
        {
            key: 'path',
            title: t('Путь'),
            dataIndex: 'path',
        },
        {
            key: 'organization_id',
            title: t('ID организации'),
            dataIndex: 'organization_id',
        },
        {
            key: 'branch',
            title: t('Филиал'),
            dataIndex: 'branch',
            render: (_, res) => <>{res.branch.name}</>,
        },
        {
            key: 'is_active_branch',
            title: t('Активность филиала'),
            dataIndex: 'branch',
            render: (_, res) => (
                <>{res.branch.is_active === true ? t('Активен') : t('Не активен')}</>
            ),
        },
        {
            key: 'is_active',
            title: t('Активность камеры'),
            dataIndex: 'is_active',
            render: (_, res) => (
                <>{res.is_active === true ? t('Активен') : t('Не активен')}</>
            ),
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
                                onConfirm={() => deleteDevice(rec.id)}
                            />
                            <EditButton onClick={() => handleEdit(rec)} />
                        </>
                    )}
                </FlexBox>
            ),
        },
    ];

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
