import { memo } from 'react';
import { Title, Card, TOKEN } from '@/shared';
import { ClientType } from './ui';
import { useNavigate } from 'react-router-dom';
import { useCheckUserQuery } from '@/entities/auth/api';

export const ClientTypeChart = memo(
    ({ data }: { data: number[] | undefined }) => {
        const navigate = useNavigate();
        const { data: admin } = useCheckUserQuery(TOKEN.get() as string);
        return (
            <Card
                className="xl:w-2/3 text-center "
                title={<Title>Клиенты</Title>}
            >
                <div className="flex flex-col justify-center items-center">
                    <ClientType data={data} />
                    <div className="flex items-center space-x-4 justify-center pt-5">
                        <span className="flex items-center space-x-2">
                            <span className="w-[20px] h-[20px] rounded-full bg-[#2E3A8C]" />
                            {admin?.is_admin ? (
                                <span
                                    onClick={() =>
                                        navigate('/clientspodrobnie')
                                    }
                                    className="cursor-pointer"
                                >
                                    {data ? data[0] : 0} - постоянные клиенты
                                </span>
                            ) : (
                                <span>
                                    {data ? data[0] : 0} - постоянные клиенты
                                </span>
                            )}
                        </span>
                        <span className="flex items-center space-x-2">
                            <span className="w-[20px] h-[20px] rounded-full bg-[#32CD32]" />
                            <span>{data ? data[1] : 0} - новые клиенты</span>
                        </span>
                    </div>
                </div>
            </Card>
        );
    },
);
