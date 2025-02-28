import { useAppActions } from '@/shared';
import { Button, DatePicker, DatePickerProps, Popconfirm } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const { RangePicker } = DatePicker;
interface IHeaderProps {
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null;
    setDates: (dates: any) => void;
    onDeleteSelected: () => void;
    hasSelected: boolean;
}
export const HeaderBadImages: FC<IHeaderProps> = ({
    dates,
    setDates,
    onDeleteSelected,
    hasSelected,
}) => {
    const { setHomeDate } = useAppActions();
    const { t } = useTranslation();
    const onChangeInterval: RangePickerProps['onChange'] = (dates) => {
        setDates(dates);
    };
    const onChange: DatePickerProps['onChange'] = (_, dateString) => {
        setHomeDate(dayjs(dateString as never));
        setDates(null);
    };
    return (
        <div className="flex justify-end gap-2">
            <Popconfirm
                title={t('Вы действительно хотите удалить?')}
                onConfirm={onDeleteSelected}
                okText={t('Да')}
                cancelText={t('Нет')}
            >
                <Button type="primary" danger disabled={!hasSelected}>
                    {t('Удалить выбранные')}
                </Button>
            </Popconfirm>
            <RangePicker
                value={dates}
                onChange={onChangeInterval}
                format="YYYY-MM-DD"
                allowClear
                className="w-full lg:w-[350px]"
            />
            <DatePicker
                allowClear={false}
                placeholder={t('Выберите день')}
                onChange={onChange}
                className="w-full lg:w-[160px]"
            />
        </div>
    );
};
