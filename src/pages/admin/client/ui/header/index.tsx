import { FlexBox } from '@/shared';
import { DatePicker, Select } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { FC } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface IHeaderProps {
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null;
    setDates: React.Dispatch<
        React.SetStateAction<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>
    >;
    topCount: number;
    setTopCount: (value: number) => void; //
}

export const ClientHeader: FC<IHeaderProps> = ({
    setDates,
    dates,
    setTopCount,
    topCount,
}) => {
    const navigate = useNavigate();
    const onChangeInterval: RangePickerProps['onChange'] = (dates) => {
        setDates(dates);
    };
    const handleChange = (value: number) => {
        setTopCount(value);
    };
    return (
        <FlexBox cls="justify-between flex-wrap">
            <h2 className="header_title">
                <FaArrowLeft
                    size={15}
                    className="mr-4 cursor-pointer hover:text-blue-300 duration-150"
                    onClick={() => navigate(-1)}
                />
                Топ клиенты
            </h2>
            <div className="flex">
                <Select
                    value={topCount}
                    onChange={handleChange}
                    className="w-[100%] mr-2"
                    placeholder="Выберите значение"
                >
                    <Option value={10}>10</Option>
                    <Option value={15}>15</Option>
                    <Option value={25}>25</Option>
                    <Option value={50}>50</Option>
                </Select>
                <RangePicker
                    value={dates}
                    onChange={onChangeInterval}
                    format="YYYY-MM-DD"
                    allowClear
                    className="w-[100%]"
                />
            </div>
        </FlexBox>
    );
};
