import { useGetAllBranchesQuery } from '@/entities/branch/api';
import { useAppActions, useAppSelector } from '@/shared';
import { mapToOptions } from '@/shared/lib/mapToOptions';
import { DatePicker, Radio, Select } from 'antd';
import type { DatePickerProps } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { FC, useEffect, useMemo, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const { RangePicker } = DatePicker;

interface IHeaderProps {
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null;
    setDates: React.Dispatch<
        React.SetStateAction<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>
    >;
}

export const Header: FC<IHeaderProps> = ({ setDates, dates }) => {
    const { attendanceBranch } = useAppSelector();
    const { setAttendanceBranch, setHomeDate } = useAppActions();
    const [filter, setFilter] = useState<'week' | 'month' | null>(null);
    const { data: branches } = useGetAllBranchesQuery();
    const branchOptions = useMemo(() => mapToOptions(branches), [branches]);
    const navigate = useNavigate();
    useEffect(() => {
        if (branchOptions && branchOptions.length) {
            setAttendanceBranch(branchOptions[0].value as number);
        }
    }, [branchOptions, setAttendanceBranch]);
    const onChangeInterval: RangePickerProps['onChange'] = (dates) => {
        setDates(dates);
        setFilter(null);
    };
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
        setFilter(filter); // Устанавливаем текущий фильтр
    };
    const onChange: DatePickerProps['onChange'] = (_, dateString) => {
        setHomeDate(dayjs(dateString as never));
        setDates(null);
    };
    return (
        <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-4">
            {/* Заголовок с кнопкой "Назад" */}
            <h2 className="flex items-center text-lg font-semibold">
                <FaArrowLeft
                    size={18}
                    className="mr-3 cursor-pointer hover:text-blue-500 transition-colors duration-150"
                    onClick={() => navigate(-1)}
                />
                Статистика
            </h2>

            {/* Фильтры */}
            <div className="flex flex-wrap lg:flex-nowrap items-center gap-4 w-full lg:w-auto">
                {/* Фильтры Radio */}
                <Radio.Group
                    value={filter}
                    onChange={(e) => applyFilter(e.target.value)}
                    className="flex-shrink-0"
                >
                    <Radio.Button value="week">Текущая неделя</Radio.Button>
                    <Radio.Button value="month">Текущий месяц</Radio.Button>
                </Radio.Group>

                {/* Выбор диапазона */}
                <RangePicker
                    value={dates}
                    onChange={onChangeInterval}
                    format="YYYY-MM-DD"
                    allowClear
                    className="w-full lg:w-auto flex-shrink-0"
                />

                {/* Дополнительные фильтры */}
                <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
                    <DatePicker
                        allowClear={false}
                        placeholder="Выберите день"
                        onChange={onChange}
                        className="w-full lg:w-[160px]"
                    />
                    <Select
                        options={branchOptions}
                        value={attendanceBranch}
                        placeholder="Филиал"
                        onSelect={(e) => setAttendanceBranch(e)}
                        allowClear
                        onClear={() => setAttendanceBranch(undefined)}
                        className="w-full lg:w-[160px]"
                    />
                </div>
            </div>
        </div>
    );
};
