import React, { useState, useEffect } from 'react';
import { Image, List, message, Popconfirm, Button } from 'antd';
import { IEmployeeImage } from '@/entities/employee/model/types';
import {
    useDeleteImageMutation,
    useGetEmployeeImagesByIdQuery,
} from '@/entities/employee-info/api';
import { useParams } from 'react-router-dom';

export const EmployeeImageGallery: React.FC = () => {
    const { id } = useParams();
    const [page, setPage] = useState(1); // Стартовая страница
    const [images, setImages] = useState<IEmployeeImage[]>([]);
    const [deleteImage, { isSuccess }] = useDeleteImageMutation();
    const [hasMore, setHasMore] = useState(true); // Проверка наличия больше изображений
    const { data, isLoading } = useGetEmployeeImagesByIdQuery(
        { employee_id: id, page, page_size: 10 },
        { skip: id === undefined },
    );

    useEffect(() => {
        if (isSuccess) {
            message.success('Успешно удалено');
        }
    }, [isSuccess]);

    useEffect(() => {
        if (data) {
            setImages((prev) => {
                // Убираем дубликаты через фильтрацию
                const newImages = data.content.filter(
                    (image) =>
                        !prev.some((prevImage) => prevImage.id === image.id),
                );
                return page === 1 ? newImages : [...prev, ...newImages];
            });

            // Проверяем, есть ли еще изображения
            setHasMore(page < data?.total_pages);
        }
    }, [page, data]);

    const handleDelete = (imageId: number) => {
        deleteImage(imageId).then(() => {
            // После успешного удаления, обновляем список изображений, убирая удаленное
            setImages((prev) => prev.filter((image) => image.id !== imageId));
        });
    };

    const loadMoreImages = () => {
        if (hasMore && !isLoading) {
            setPage((prev) => prev + 1);
        }
    };

    return (
        <div
            style={{
                height: '60vh',
                overflowY: 'auto',
                padding: '16px',
                border: '1px solid #ddd',
            }}
            className="custom-scroll rounded-lg"
        >
            <List
                grid={{
                    gutter: 5, // Расстояние между элементами
                    xs: 2, // 1 колонка для экранов <576px
                    sm: 2, // 2 колонки для экранов ≥576px
                    md: 2, // 3 колонки для экранов ≥768px
                    lg: 3, // 4 колонки для экранов ≥992px
                    xl: 4, // 5 колонок для экранов ≥1200px
                    xxl: 4, // 6 колонок для экранов ≥1600px
                }}
                dataSource={images}
                renderItem={(item) => (
                    <List.Item key={item.id}>
                        <div className="relative group flex flex-col justify-center items-center">
                            <Image
                                src={item.url}
                                alt={`Employee ${item.person_id}`}
                                width={100}
                                height={100}
                                className="rounded-full cursor-pointer"
                                preview={{ mask: null }}
                            />
                            <Popconfirm
                                onConfirm={() => handleDelete(Number(item.id))}
                                className="absolute bottom-0 cursor-pointer w-[100px] h-[50px] bg-white rounded-b-full text-red-500 flex justify-center items-center opacity-0 group-hover:opacity-80 transition-opacity duration-300 ease-in-out"
                                title="Вы действительно хотите удалить?"
                            >
                                <div className="text-2xl font-semibold">x</div>
                            </Popconfirm>
                        </div>
                    </List.Item>
                )}
            />
            {hasMore && !isLoading && (
                <div className="text-center mt-4">
                    <Button
                        onClick={loadMoreImages}
                        type="primary"
                        size="large"
                    >
                        Загрузить больше
                    </Button>
                </div>
            )}
            {isLoading && (
                <div className="text-center mt-4">
                    <Button loading type="primary" size="large">
                        Загружается...
                    </Button>
                </div>
            )}
        </div>
    );
};
