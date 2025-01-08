import { useDeleteClientMutation } from '@/entities/client/api';
import { ITopClients } from '@/entities/client/models/types';
import { List, Image, Button, Popconfirm, message } from 'antd';
import { FC, useEffect } from 'react';
import { IoMdShareAlt } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

interface TopClientsTableProps {
    data: ITopClients[] | undefined;
    top: number;
    title: string;
}

export const TopClientsTable: FC<TopClientsTableProps> = ({
    data,
    top,
    title,
}) => {
    const navigate = useNavigate();
    const [deleteClient, { isSuccess }] = useDeleteClientMutation();
    useEffect(() => {
        if (isSuccess) {
            message.success('Успешно удалено');
        }
    }, [isSuccess]);
    return (
        <div>
            <h2 className="text-center py-5">
                Топ {top} клиентов {title}
            </h2>
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
                        <div className="relative group flex flex-col justify-center items-center">
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
                                    title="Вы действительно хотите удалить?"
                                >
                                    x
                                </Popconfirm>
                                <div className="text-slate-950 text-[14px] text-center font-semibold">
                                    {item.visit_count}
                                </div>
                                <Button
                                    type="link"
                                    onClick={() =>
                                        navigate(
                                            `/top_clients/${item.client_id}`,
                                        )
                                    }
                                    icon={<IoMdShareAlt size={20} />}
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
