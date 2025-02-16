import { useGetTopClientByIdQuery } from '@/entities/client/api';
import { Button, Card, Image, Spin, List, Popconfirm, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ClientAttendances } from '../clientAttendance';
import { useDeleteImageMutation } from '@/entities/employee-info/api';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next'

export const ClientDetail = () => {
    const {t} = useTranslation()
    const [deleteImage, { isSuccess }] = useDeleteImageMutation();
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useGetTopClientByIdQuery(id, {
        skip: id === undefined,
    });
    useEffect(() => {
        if (isSuccess) message.success(t('Успешно удалено'));
    }, [isSuccess]);
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (!data) {
        return <div>{t("Данные не найдены")}</div>;
    }

    return (
        <div>
            <Card className="w-full">
                <Button onClick={() => navigate(-1)} type="primary">
                    {t("Назад")}
                </Button>
                <div
                    style={{
                        height: '60vh',
                        overflowY: 'auto',
                        padding: '16px',
                        border: '1px solid #ddd',
                    }}
                    className="custom-scroll rounded-lg mt-5"
                >
                    <List
                        grid={{
                            xs: 2, // 1 колонка для экранов <576px
                            sm: 2, // 2 колонки для экранов ≥576px
                            md: 4, // 3 колонки для экранов ≥768px
                            lg: 6, // 4 колонки для экранов ≥992px
                            xl: 8, // 5 колонок для экранов ≥1200px
                            xxl: 10, // 6 колонок для экранов ≥1600px
                        }}
                        dataSource={data.images}
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
                                    <div className="absolute bottom-0 cursor-pointer w-[100px] h-[50px] bg-[#80808080] text-red-500 flex items-center justify-center  opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-bl-full rounded-br-full">
                                        <Popconfirm
                                            onConfirm={() =>
                                                deleteImage(item.id)
                                            }
                                            className="basis-1/2 text-center text-[16px] font-bold"
                                            title={t("Вы действительно хотите удалить?")}
                                        >
                                            x
                                        </Popconfirm>
                                    </div>
                                </div>
                            </List.Item>
                        )}
                    />
                </div>
            </Card>
            <ClientAttendances />
        </div>
    );
};
