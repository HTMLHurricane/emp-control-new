import { useGetRegularClientsQuery } from '@/entities/count/api';
import { useAppSelector } from '@/shared';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { Button, Image, List, message, Popconfirm } from 'antd/lib';
import { useDeleteClientMutation } from '@/entities/client/api';
import { useEffect } from 'react';
import { FaInfo } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

export const ClientTypePage = () => {
    const {t} = useTranslation()
    const { dates, attendanceBranch, homeDate } = useAppSelector();
    const date = homeDate.format('YYYY-MM-DD');
    const [deleteClient, { isSuccess }] = useDeleteClientMutation();
    useEffect(() => {
        if (isSuccess) {
            message.success(t('Успешно удалено'));
        }
    }, [isSuccess]);
    const { data } = useGetRegularClientsQuery({
        start_date_str: dates ? `${dates?.[0]?.format('YYYY-MM-DD')}` : date,
        end_date_str: dates ? `${dates?.[1]?.format('YYYY-MM-DD')}` : date,
        branch_id: attendanceBranch!,
    });
    const navigate = useNavigate();
    return (
        <div>
            <h2 className="flex items-center text-lg font-semibold">
                <FaArrowLeft
                    size={18}
                    className="mr-3 cursor-pointer hover:text-blue-500 transition-colors duration-150"
                    onClick={() => navigate('/count')}
                />
                {t("Клиенты")}
            </h2>
            <div className="text-xl font-semibold text-center my-5">
                {t("Постоянные клиенты за")} {dates?.[0]?.format('YYYY-MM-DD')} -{' '}
                {dates?.[1]?.format('YYYY-MM-DD')}
            </div>
            <List
                grid={{
                    gutter: 2,
                    xs: 2,
                    sm: 3,
                    md: 4,
                    lg: 5,
                    xl: 6,
                    xxl: 7,
                }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item key={item.first_photo}>
                        <div className="relative group flex justify-center items-center">
                            <Image
                                src={item?.first_photo}
                                alt={`Employee`}
                                width={150}
                                height={150}
                                className="cursor-pointer rounded-xl"
                                preview={{ mask: null }}
                            />
                            <div className="absolute bottom-0 cursor-pointer w-[150px] rounded-b-xl h-[30px] bg-white opacity-80 text-red-500 flex items-center justify-center group-hover:opacity-80 transition-opacity duration-300 ease-in-out">
                                <Popconfirm
                                    onConfirm={() =>
                                        deleteClient(item.client_id)
                                    }
                                    className="basis-1/2 text-center text-[16px] font-bold"
                                    title={t("Вы действительно хотите удалить?")}
                                >
                                    x
                                </Popconfirm>

                                <Button
                                    type="link"
                                    onClick={() =>
                                        navigate(
                                            `/top_clients/${item.client_id}`,
                                        )
                                    }
                                    icon={<FaInfo size={13} />}
                                    className="text-[12px] w-[20px] md:text-[14px] basis-1/2"
                                />
                            </div>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    );
};
