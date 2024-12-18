import { useGetAllBranchesQuery } from '@/entities/branch/api';
import { FlexBox, useAppActions, useAppSelector } from '@/shared';
import { mapToOptions } from '@/shared/lib/mapToOptions';
import { DatePicker, Select } from 'antd';
import type { DatePickerProps } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { FC, useEffect, useMemo } from 'react';
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
    };
    const onChange: DatePickerProps['onChange'] = (_, dateString) => {
        setHomeDate(dayjs(dateString as never));
        setDates(null);
    };
    return (
        <FlexBox cls="justify-between pb-5">
            <h2 className="header_title">
                <FaArrowLeft
                    size={15}
                    className="mr-4 cursor-pointer hover:text-blue-300 duration-150"
                    onClick={() => navigate(-1)}
                />
                Статистика
            </h2>
            <div className="flex flex-col lg:flex-row gap-1">
                <RangePicker
                    value={dates}
                    onChange={onChangeInterval}
                    format="YYYY-MM-DD"
                    allowClear
                    className="w-[320px]"
                />
                <DatePicker
                    allowClear={false}
                    placeholder="Выберите день"
                    onChange={onChange}
                    className="w-[220px]"
                />
                <Select
                    options={branchOptions}
                    value={attendanceBranch}
                    placeholder="Филиал"
                    onSelect={(e) => setAttendanceBranch(e)}
                    allowClear
                    onClear={() => setAttendanceBranch(undefined)}
                />
            </div>
        </FlexBox>
    );
};
