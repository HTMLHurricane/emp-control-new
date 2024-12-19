import { useGetAllBranchesQuery } from '@/entities/branch/api';
import { useAppActions, useAppSelector } from '@/shared';
import { mapToOptions } from '@/shared/lib/mapToOptions';
import { DatePicker, DatePickerProps, Select } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';

export const Header = () => {
    const { attendanceBranch } = useAppSelector();
    const { setHomeDate, setAttendanceBranch } = useAppActions();
    const onChange: DatePickerProps['onChange'] = (_, dateString) => {
        setHomeDate(dayjs(dateString as never));
    };
    const { data: branches } = useGetAllBranchesQuery();
    const branchOptions = useMemo(() => mapToOptions(branches), [branches]);
    useEffect(() => {
        if (branchOptions && branchOptions.length) {
            setAttendanceBranch(branchOptions[0].value as number);
        }
    }, [branchOptions, setAttendanceBranch]);

    return (
        <div className="flex justify-between items-center md:px-4 flex-wrap">
            <h2 className="header_title">Главная</h2>
            <div>
                <DatePicker
                    allowClear={false}
                    onChange={onChange}
                    className="w-[120px] mr-2"
                    placeholder='Дата'
                />
                <Select
                    options={branchOptions}
                    value={attendanceBranch}
                    placeholder="Филиал"
                    onSelect={(e) => setAttendanceBranch(e)}
                    allowClear
                    onClear={() => setAttendanceBranch()}
                />
            </div>
        </div>
    );
};
