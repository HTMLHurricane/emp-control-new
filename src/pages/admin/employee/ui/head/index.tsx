import { useGetAllBranchesQuery } from '@/entities/branch/api';
import { useAppActions, useAppSelector } from '@/shared';
import { mapToOptions } from '@/shared/lib/mapToOptions';
import { Button, Select } from 'antd';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next'
import { FaArrowLeft, FaUserPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const AdminEmployeePageHead = () => {
    const {t} = useTranslation()
    const { isCreatingEmployee, isUpdatingEmployee, attendanceBranch } =
        useAppSelector();
    const { setIsCreatingEmployee, setAttendanceBranch } = useAppActions();
    const { data: branches } = useGetAllBranchesQuery();
    const branchOptions = useMemo(() => mapToOptions(branches), [branches]);
    const navigate = useNavigate();

    useEffect(() => {
        if (branchOptions && branchOptions.length) {
            setAttendanceBranch(branchOptions[0].value as number);
        }
    }, [branchOptions, setAttendanceBranch]);

    const handleCreate = () => {
        setIsCreatingEmployee(true);
    };

    return (
        <div className="flex justify-between items-center">
            <h2 className="header_title">
                <FaArrowLeft
                    size={15}
                    className="mr-4 cursor-pointer hover:text-blue-300 duration-150"
                    onClick={() => navigate(-1)}
                />
                {t("Сотрудники")}
            </h2>
            {!isCreatingEmployee && !isUpdatingEmployee && (
                <div className="flex">
                    <Select
                        options={branchOptions}
                        value={attendanceBranch}
                        placeholder={t("Филиал")}
                        onSelect={(e) => setAttendanceBranch(e)}
                        allowClear
                        onClear={() => setAttendanceBranch()}
                    />
                    <Button
                        icon={<FaUserPlus />}
                        type="primary"
                        onClick={handleCreate}
                        className="text-[14px] md:ml-4 ml-2"
                    >
                        <div className="hidden md:block">
                            {t("Добавить сотрудника")}
                        </div>
                    </Button>
                </div>
            )}
        </div>
    );
};

export { AdminEmployeePageHead };
