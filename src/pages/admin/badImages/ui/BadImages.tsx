import {
    useDeleteClientBadImageMutation,
    useDeleteMultipleBadImagesMutation,
    useGetClientsBadImagesByIntervalQuery,
} from '@/entities/badImages/api';
import { BadImagesData } from '@/entities/badImages/model/types/types';
import { columnResponseText } from '@/shared/const/css';
import { Image, message, Popconfirm, Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HeaderBadImages } from './Header';
import { useAppSelector } from '@/shared';

export const BadImages = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
    const [page, setPage] = useState(1);
    const [page_size, setPageSize] = useState(5);
    const { homeDate } = useAppSelector();
    const date = homeDate.format('YYYY-MM-DD');
    const { t } = useTranslation();
    const [dates, setDates] = useState<any>();
    const { data, isLoading } = useGetClientsBadImagesByIntervalQuery({
        start_date: dates ? dates?.[0]?.format('YYYY-MM-DD') : date,
        end_date: dates ? dates?.[1]?.format('YYYY-MM-DD') : date,
        page,
        page_size,
    });
    const [deleteClientBadImage, { isSuccess: deleteSuccess }] =
        useDeleteClientBadImageMutation();
    const [deleteMultipleClientBadImages] =
        useDeleteMultipleBadImagesMutation();

    useEffect(() => {
        if (deleteSuccess) {
            message.success(t('Успешно удалено'));
        }
    }, [deleteSuccess]);

    const handleDeleteSelected = async () => {
        if (!selectedRowKeys.length) return;

        try {
            await deleteMultipleClientBadImages(selectedRowKeys).unwrap();
            message.success(t('Успешно удалено'));
            setSelectedRowKeys([]);
        } catch (error) {
            message.error(t('Ошибка при удалении'));
        }
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedKeys: React.Key[]) => {
            setSelectedRowKeys(newSelectedKeys as number[]);
        },
    };

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
            render: (item) => <>{dayjs(item).format('YYYY-MM-DD')}</>,
            className: `${columnResponseText}`,
        },
        {
            title: t('Время'),
            key: 'created_at',
            dataIndex: 'created_at',
            render: (item) => <>{dayjs(item).format('HH:mm')}</>,
            className: `${columnResponseText}`,
        },
        {
            title: t('Действия'),
            key: 'actions',
            dataIndex: 'actions',
            className: `${columnResponseText}`,
            render: (_, res) => (
                <div className="flex justify-center gap-1 lg:gap-4">
                    <Popconfirm
                        onConfirm={() => deleteClientBadImage(res.id)}
                        className="text-2xl text-white bg-red-500 px-2 rounded-lg cursor-pointer"
                        title={t('Вы действительно хотите удалить?')}
                    >
                        x
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <>
            <HeaderBadImages
                dates={dates}
                setDates={setDates}
                onDeleteSelected={handleDeleteSelected}
                hasSelected={selectedRowKeys.length > 0}
            />
            <Table
                rowSelection={rowSelection}
                loading={isLoading}
                scroll={{ x: true }}
                columns={columns}
                rowKey={(el) => el.id}
                dataSource={data?.content ?? []}
                pagination={{
                    current: page,
                    pageSize: page_size,
                    total: data?.total_elements ?? 0,
                    onChange: (page, pageSize) => {
                        setPage(page);
                        setPageSize(pageSize);
                    },
                }}
                className="mt-2"
            />
        </>
    );
};
