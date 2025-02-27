import {
    useDeleteClientBadImageMutation,
    useGetClientsBadImagesQuery,
} from '@/entities/badImages/api';
import { BadImagesData } from '@/entities/badImages/model/types/types';
import { columnResponseText } from '@/shared/const/css';
import { Button, Image, message, Popconfirm, Table, TableProps } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaInfo } from 'react-icons/fa6';
export const BadImages = () => {
    const { t } = useTranslation();
    const { data, isLoading } = useGetClientsBadImagesQuery();
    const [deleteClientBadImage, { isSuccess: deleteSuccess }] =
        useDeleteClientBadImageMutation();
    useEffect(() => {
        if (deleteSuccess) {
            message.success(t('Успешно удалено'));
        }
    }, [deleteSuccess]);

    const columns: TableProps<BadImagesData>['columns'] = [
        {
            title: t('Фото'),
            key: 'first_image',
            dataIndex: 'image_key',
            className: `${columnResponseText}`,
            render: (_, res) =>
                res.image_key ? (
                    <Image
                        src={res.image_key}
                        alt={`employee`}
                        width={100}
                        height={100}
                        className="rounded-full cursor-pointer"
                        preview={{ mask: null }}
                    />
                ) : (
                    <>{t('Фото отсутствует')}</>
                ),
        },
        {
            title: t('Позиция'),
            key: 'pose',
            dataIndex: 'pose',
            className: `${columnResponseText}`,
        },
        {
            title: t('Дата'),
            key: 'created_at',
            dataIndex: 'created_at',
            className: `${columnResponseText}`,
        },
        {
            title: t('Организация'),
            key: 'organization_id',
            dataIndex: 'organization_id',
            className: `${columnResponseText}`,
        },
        {
            title: t('Действия'),
            key: 'actions',
            dataIndex: 'actions',
            className: `${columnResponseText}`,
            render: (_, res) => (
                <div className="flex gap-1 lg:gap-4">
                    <Button
                        type="primary"
                        icon={<FaInfo />}
                        className="text-[12px] md:text-[14px]"
                    />
                    <Popconfirm
                        onConfirm={() => deleteClientBadImage(res.id)}
                        className="text-2xl text-white bg-red-500 px-2 rounded-lg cursor-pointer"
                        title={t('Вы действительно хотите удалить сотрудника?')}
                    >
                        x
                    </Popconfirm>
                </div>
            ),
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
