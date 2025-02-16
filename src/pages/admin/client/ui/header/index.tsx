import { FlexBox } from '@/shared';
import { DatePicker, Radio, Select } from 'antd';
import dayjs from 'dayjs';
import { FC } from 'react';
import { useTranslation } from 'react-i18next'
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

interface IHeaderProps {
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null;
    setDates: React.Dispatch<
        React.SetStateAction<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>
    >;
    topCount: number;
    setTopCount: (value: number) => void;
    setFilter: (value: 'week' | 'month' | null) => void; // Убираем string и добавляем конкретные значения
    filter: 'week' | 'month' | null; // Здесь тоже указываем 'week' | 'month' | null
}

export const ClientHeader: FC<IHeaderProps> = ({
    setDates,
    setTopCount,
    topCount,
    setFilter,
    filter,
}) => {
    const {t} = useTranslation()
    const navigate = useNavigate();
    const applyFilter = (filter: 'week' | 'month') => {
        if (filter === 'week') {
            const startOfWeek = dayjs().startOf('week');
            const endOfWeek = dayjs().endOf('week');
            setDates([startOfWeek, endOfWeek]);
        } else if (filter === 'month') {
            const startOfMonth = dayjs().startOf('month');
            const endOfMonth = dayjs().endOf('month');
            setDates([startOfMonth, endOfMonth]);
        }
        setFilter(filter);
    };

    const handleChange = (value: number) => {
        setTopCount(value);
    };

    const handleChangeDate = (date: dayjs.Dayjs | null) => {
        if (date) {
            const startOfMonth = date.startOf('month');
            const endOfMonth = date.endOf('month');
            setDates([startOfMonth, endOfMonth]);
            setFilter(null);
        } else {
            setDates(null);
            setFilter(null);
        }
    };

    return (
        <FlexBox cls="justify-between flex-wrap">
            <h2 className="header_title">
                <FaArrowLeft
                    size={15}
                    className="mr-4 cursor-pointer hover:text-blue-300 duration-150"
                    onClick={() => navigate(-1)}
                />
                {t("Топ клиенты")}
            </h2>
            <div className="flex gap-1">
                <Select
                    value={topCount}
                    onChange={handleChange}
                    placeholder={t("Выберите значение")}
                >
                    <Option value={10}>10</Option>
                    <Option value={15}>15</Option>
                    <Option value={25}>25</Option>
                    <Option value={50}>50</Option>
                </Select>
                <Radio.Group
                    value={filter}
                    onChange={(e) => applyFilter(e.target.value)}
                    className="flex-shrink-0"
                >
                    <Radio.Button value="week">{t("Текущая неделя")}</Radio.Button>
                    <Radio.Button value="month">{t("Текущий месяц")}</Radio.Button>
                </Radio.Group>
                <DatePicker
                    picker="month"
                    onChange={handleChangeDate}
                    format="YYYY-MM"
                />
            </div>
        </FlexBox>
    );
};
