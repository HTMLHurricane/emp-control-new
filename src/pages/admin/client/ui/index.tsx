import { useGetTopClientsQuery } from '@/entities/client/api';
import dayjs from 'dayjs';
import { useState } from 'react';
import { ClientHeader } from './header';
import { TopClientsTable } from './table';
import { Spin, Empty } from 'antd';
import { useTranslation } from 'react-i18next'

export const Clients = () => {
    const {t} = useTranslation()
    const [dates, setDates] = useState<
        [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
    >([dayjs().startOf('month'), dayjs().endOf('month')]);
    const [topCount, setTopCount] = useState(10);
    const [filter, setFilter] = useState<'week' | 'month' | null>(null);
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
                    filter={filter}
                    setFilter={setFilter}
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
    const getTitle = () => {
        if (filter === 'week') {
            return t('за текущую неделю');
        } else if (filter === 'month') {
            return t('за текущий месяц');
        } else if (dates && dates[0] && dates[1]) {
            return `${t('за')} ${dates[0].format('YYYY-MM')}`;
        }
        return t('Топ клиенты');
    };

    return (
        <div>
            <ClientHeader
                filter={filter}
                setFilter={setFilter}
                dates={dates}
                setDates={setDates}
                setTopCount={setTopCount}
                topCount={topCount}
            />
            {!data || data.length === 0 ? (
                <div className="flex justify-center items-center min-h-screen">
                    <Empty description={t("Данные топ клиентов не найдены")} />
                </div>
            ) : (
                <TopClientsTable
                    data={data}
                    top={topCount}
                    title={getTitle()}
                />
            )}
        </div>
    );
};
