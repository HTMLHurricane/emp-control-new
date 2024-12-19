import { ITopClients } from '@/entities/client/models/types';
import { List, Image, Button } from 'antd';
import { FC } from 'react';
import { FaEye } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

interface TopClientsTableProps {
    data: ITopClients[] | undefined;
    top: number;
}

export const TopClientsTable: FC<TopClientsTableProps> = ({ data, top }) => {
    const navigate = useNavigate();

    return (
        <div>
            <h2 className="text-center py-5">Топ {top} клиентов</h2>
            <List
                grid={{
                    gutter: 2, // Расстояние между элементами
                    xs: 2, // 1 колонка для экранов <576px
                    sm: 3, // 2 колонки для экранов ≥576px
                    md: 4, // 3 колонки для экранов ≥768px
                    lg: 5, // 4 колонки для экранов ≥992px
                    xl: 6, // 5 колонок для экранов ≥1200px
                    xxl: 7, // 6 колонок для экранов ≥1600px}}
                }}
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
                            <div className="absolute bottom-0 cursor-pointer w-[150px] h-[50px] bg-[#80808080] text-red-500 flex items-center justify-center  opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
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
