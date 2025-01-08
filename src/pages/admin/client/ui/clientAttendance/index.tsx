import { useGetClientAttendancesQuery } from '@/entities/client/api';
import { IClientAttendance } from '@/entities/client/models/types';
import { TableProps, Image, Table } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const ClientAttendances = () => {
    const [page, setPage] = useState(1);
    const [page_size, setPageSize] = useState(10);
    const { id } = useParams();
    const { data, isLoading } = useGetClientAttendancesQuery(
        {
            client_id: id,
            page,
            page_size,
        },
        { skip: id === undefined },
    );

    const columns: TableProps<IClientAttendance>['columns'] = [
        {
            key: 'date',
            dataIndex: 'date',
            title: 'Дата',
            render: (item) => <>{item.split('T')[0]}</>,
            className: 'w-[200px]',
        },
        {
            key: 'date',
            dataIndex: 'date',
            title: 'Время',
            render: (item) => <>{item.slice(11, 16)}</>,
            className: 'w-[200px]',
        },
        {
            key: 'url',
            dataIndex: 'url',
            title: 'Фото',
            render: (url) => <Image src={url} width={300} height={150} />,
            className: 'w-[300px]',
        },
        // {
        //     key: 'gender',
        //     dataIndex: 'gender',
        //     title: 'Время',
        //     render: (item) => <>{item == 'Female' ? 'Женский' : 'Мужской'}</>,
        // },
        {
            key: 'age',
            dataIndex: 'age',
            title: 'Возраст',
            render: (item) => <>{item} лет</>,
        },
        {
            key: 'score',
            dataIndex: 'score',
            title: 'score',
            render: (item) => <>{item.toFixed(2)}%</>,
        },
    ];
    return (
        <Table
            loading={isLoading}
            scroll={{ x: true, y: 400 }}
            bordered
            columns={columns}
            dataSource={data?.content}
            pagination={{
                showSizeChanger: true,
                current: page,
                pageSize: page_size,
                total: data?.total_elements,
                onChange: (page, limit) => {
                    setPage(page);
                    setPageSize(limit);
                },
            }}
            rowKey={() => Math.random()}
        />
    );
};
