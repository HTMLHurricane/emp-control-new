import { useGetTopClientsQuery } from '@/entities/client/api';
import dayjs from 'dayjs';
import { useState } from 'react';
import { ClientHeader } from './header';
import { TopClientsTable } from './table';
import { Spin, Empty } from 'antd';

export const Clients = () => {
    const [dates, setDates] = useState<
        [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
    >([dayjs(), dayjs()]);
    const [topCount, setTopCount] = useState(10);
    const { data, isLoading } = useGetTopClientsQuery({
        start_date: dates && dates[0] ? dates[0].format('YYYY-MM-DD') : '',
        end_date: dates && dates[1] ? dates[1].format('YYYY-MM-DD') : '',
        top_count: topCount,
    });

    if (isLoading) {
        return (
            <div>
                <ClientHeader
                    dates={dates}
                    setDates={setDates}
                    setTopCount={setTopCount}
                    topCount={topCount}
                />
                <div className="flex justify-center items-center min-h-screen">
                    <Spin />
                </div>
            </div>
        );
    }

    return (
        <div>
            <ClientHeader
                dates={dates}
                setDates={setDates}
                setTopCount={setTopCount}
                topCount={topCount}
            />
            {!data || data.length === 0 ? (
                <div className="flex justify-center items-center min-h-screen">
                    <Empty description="Данные топ клиентов не найдены" />
                </div>
            ) : (
                <TopClientsTable data={data} top={topCount} />
            )}
        </div>
    );
};
