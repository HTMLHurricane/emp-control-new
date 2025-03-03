import { useGetAllBranchesQuery } from '@/entities/branch/api';
import { useGetAllClientsInfoQuery } from '@/entities/home/api';
import { useAppActions, useAppSelector } from '@/shared';
import { mapToOptions } from '@/shared/lib/mapToOptions';
import { DatePicker, DatePickerProps, Select } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const Header = () => {
    const { t } = useTranslation();
    const { attendanceBranch } = useAppSelector();
    const { setHomeDate, setAttendanceBranch } = useAppActions();
    const onChange: DatePickerProps['onChange'] = (_, dateString) => {
        setHomeDate(dayjs(dateString as never));
    };
    const { data: branches } = useGetAllBranchesQuery();
    const branchOptions = useMemo(() => mapToOptions(branches), [branches]);
    const { data } = useGetAllClientsInfoQuery();
    useEffect(() => {
        if (branchOptions && branchOptions.length) {
            setAttendanceBranch(branchOptions[0].value as number);
        }
    }, [branchOptions, setAttendanceBranch]);

    return (
        <div className="flex justify-between items-center md:px-4 flex-wrap">
            <h2 className="header_title">{t('Главная')}</h2>
            <div className="flex items-center">
                <div className="flex items-center gap-6 p-4">
                    <div className="flex items-center gap-2 text-gray-600">
                        <span className="font-medium">
                            {t('Всего клиентов')}:
                        </span>
                        <span className="text-lg font-semibold text-gray-900">
                            {data?.all_clinets ?? 0}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <span className="font-medium">
                            {t('Возвращающиеся клиенты')}:
                        </span>
                        <span className="text-lg font-semibold text-green-600">
                            {data?.returning_clients ?? 0}
                        </span>
                    </div>
                </div>

                <DatePicker
                    allowClear={false}
                    onChange={onChange}
                    className="w-[120px] mx-2"
                    placeholder={t('Дата')}
                />
                <Select
                    options={branchOptions}
                    value={attendanceBranch}
                    placeholder={t('Филиал')}
                    onSelect={(e) => setAttendanceBranch(e)}
                    allowClear
                    onClear={() => setAttendanceBranch()}
                />
            </div>
        </div>
    );
};
