import { useGetLastDataQuery } from '@/entities/home/api';
import { Card, Title } from '@/shared';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { columnResponseText } from '@/shared/const/css';
import { Image, Spin, Table, TableProps, Tag } from 'antd';
import { ILastAttendance } from '@/entities/home/model';

const Last = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [isPreviewOpened, setIsPreviewOpened] = useState(false);
    const navigate = useNavigate();
    const { data, isLoading } = useGetLastDataQuery({
        page,
        page_size: limit,
    });

    const columns: TableProps<ILastAttendance>['columns'] = [
        {
            title: 'ФИО',
            dataIndex: 'full_name',
            key: 'full_name',
            render: (name, res) => (
                <div className="flex items-center">
                    <Image
                        width={100}
                        height={100}
                        preview={{
                            onVisibleChange(value) {
                                if (value) {
                                    setIsPreviewOpened(true);
                                } else {
                                    setIsPreviewOpened(false);
                                }
                            },
                        }}
                        onClick={(e) => e.stopPropagation()}
                        src={res.employee.first_image.url}
                        className="hidden lg:block lg:w-[100px]"
                    />
                    <span className="px-0 lg:px-2">{name}</span>
                </div>
            ),
            className: `${columnResponseText}`,
        },
        {
            title: 'Должность',
            dataIndex: 'position',
            key: 'position',
            render: (_, res) => <>{res.employee.branch.name}</>,
            responsive: ['md', 'lg', 'xl'],
            className: `${columnResponseText}`,
        },
        {
            title: 'Филиал',
            dataIndex: 'branch',
            key: 'branch',
            render: (_, res) => <>{res.employee.branch.name}</>,
            className: `${columnResponseText}`,
        },
        {
            title: 'Статус',
            dataIndex: 'score',
            key: 'score',
            render: (score) => (
                <Tag color={score > 60 ? 'green' : 'red'}>
                    {score.toFixed(2)}%
                </Tag>
            ),
            responsive: ['md', 'lg', 'xl'],
            className: `${columnResponseText}`,
        },
        {
            title: 'Время',
            dataIndex: 'date',
            key: 'date',
            render: (time) => time.split('T')[1].slice(0, 5),
            className: `${columnResponseText} w-[50px]`,
        },
        {
            title: 'Изображение',
            dataIndex: 'url',
            key: 'url',
            render: (url) => (
                <Image
                    preview={{
                        onVisibleChange(value) {
                            if (value) {
                                setIsPreviewOpened(true);
                            } else {
                                setIsPreviewOpened(false);
                            }
                        },
                    }}
                    onClick={(e) => e.stopPropagation()}
                    src={url}
                    alt="photo"
                    className="w-[100px]"
                />
            ),
            className: `${columnResponseText}`,
        },
    ];

    if (isLoading && !data) {
        return (
            <div className="w-full flex-1 flex items-center justify-center h-[450px]">
                <Spin />
            </div>
        );
    } else {
        return (
            <Card className="flex-col flex-1 min-h-[450px] text-center">
                <Title>Последняя активность</Title>
                <Table
                    scroll={{ y: 450 }}
                    dataSource={data?.content}
                    columns={columns}
                    size="small"
                    rowKey={(res) => res.id}
                    pagination={{
                        showSizeChanger: true,
                        current: page,
                        pageSize: limit,
                        total: data?.total_pages,
                        onChange: (page, limit) => {
                            setPage(page);
                            setLimit(limit);
                        },
                    }}
                    onRow={(rec) => ({
                        onClick: () => {
                            if (!isPreviewOpened) {
                                navigate(`employees/${rec.id}`);
                            }
                        },
                        className: 'hover:cursor-pointer',
                    })}
                    className="mt-4 w-full sm:w-full md:w-auto lg:w-auto xl:w-auto"
                />
            </Card>
        );
    }
};

export { Last };
