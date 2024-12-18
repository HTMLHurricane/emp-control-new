import {
    useDeleteDeviceMutation,
    useGetDevicesQuery,
} from '@/entities/device/api';
import { Device } from '@/entities/device/model/types';
import { FlexBox, DeleteButton, EditButton, useAppActions } from '@/shared';
import { message, Table, TableProps } from 'antd';
import { useEffect } from 'react';

export const DeviceTable = () => {
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
            message.success('Успешно удалено');
        }
    }, [isSuccess]);

    const columns: TableProps<Device>['columns'] = [
        {
            key: 'id',
            title: 'ID Камеры',
            dataIndex: 'id',
        },
        {
            key: 'name',
            title: 'Камера',
            dataIndex: 'name',
        },
        {
            key: 'path',
            title: 'Путь',
            dataIndex: 'path',
        },
        {
            key: 'organization_id',
            title: 'ID организации',
            dataIndex: 'organization_id',
        },
        {
            key: 'branch',
            title: 'Филиал',
            dataIndex: 'branch',
            render: (_, res) => <>{res.branch.name}</>,
        },
        {
            key: 'is_active_branch',
            title: 'Активность филиала',
            dataIndex: 'branch',
            render: (_, res) => (
                <>{res.branch.is_active === true ? 'Активен' : 'Не активен'}</>
            ),
        },
        {
            key: 'is_active',
            title: 'Активность камеры',
            dataIndex: 'is_active',
            render: (_, res) => (
                <>{res.is_active === true ? 'Активен' : 'Не активен'}</>
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
            dataSource={data}
            className="mt-5"
        />
    );
};
