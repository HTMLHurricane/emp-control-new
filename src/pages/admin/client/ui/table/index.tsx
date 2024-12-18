import { ITopClients } from '@/entities/client/models/types';
import { useDeleteImageMutation } from '@/entities/employee-info/api';
import { List, Popconfirm, Image, Button, message } from 'antd';
import { FC, useEffect } from 'react';
import { FaEye } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface TopClientsTableProps {
    data: ITopClients[] | undefined;
    top: number;
}

export const TopClientsTable: FC<TopClientsTableProps> = ({ data, top }) => {
    const [deleteImage, { isSuccess }] = useDeleteImageMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) message.success('Фотография удалена');
    }, [isSuccess]);

    return (
        <div>
            <h2 className="text-center py-5">Топ {top} клиентов</h2>
            <List
                grid={{ column: 8 }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item key={item.first_photo}>
                        <div className="relative group flex flex-col justify-center items-center">
                            <Image
                                src={item.first_photo}
                                alt={`Employee`}
                                width={150}
                                height={150}
                                className="cursor-pointer rounded-sm"
                                preview={{ mask: null }}
                            />
                            <div className="absolute bottom-0 cursor-pointer w-[150px] h-[50px] bg-[#80808080] text-red-500 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                <Popconfirm
                                    onConfirm={() =>
                                        deleteImage(item.client_id)
                                    }
                                    className="basis-1/2"
                                    title="Вы действительно хотите удалить?"
                                >
                                    <MdDelete size={30} />
                                </Popconfirm>
                                <Button
                                    type="link"
                                    onClick={() =>
                                        navigate(
                                            `/top_clients/${item.client_id}`,
                                        )
                                    }
                                    icon={<FaEye size={25} />}
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
