import { useState } from 'react';
import { Button, Radio, RadioChangeEvent } from 'antd';
import { FlexBox } from '@/shared';
import { EmployeeInfo } from './employeeInfo/employeeInfo';
import { EmployeeAttendance } from './employeeAttendance/employeeAttendance';
import { EmployeeDevices } from './employeeDevices/employeeDevices';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

type Tab = 'info' | 'attendance' | 'devices';

const AdminEmployeeInfoPage = () => {
    const {t} = useTranslation()
    const [activeTab, setActiveTab] = useState<Tab>('info');
    const handleTabChange = (e: RadioChangeEvent) => {
        setActiveTab(e.target.value as Tab);
    };
    const navigate = useNavigate();

    return (    
        <FlexBox cls="flex-col">
            <div className="flex items-center justify-between">
                <Button
                    onClick={() => navigate(-1)}
                    type="primary"
                    className="self-start"
                >
                    {t("Назад")}
                </Button>
                <Radio.Group
                    value={activeTab}
                    onChange={handleTabChange}
                    buttonStyle="solid"
                    size="middle"
                    className="flex"
                >
                    <Radio.Button
                        value="info"
                        className="font-medium text-center"
                    >
                        {t("Информация о сотруднике")}
                    </Radio.Button>
                    <Radio.Button
                        value="attendance"
                        className="font-medium text-center"
                    >
                        {t("Посещаемость")}
                    </Radio.Button>
                    <Radio.Button
                        value="devices"
                        className="font-medium text-center"
                    >
                        {t("Камера")}
                    </Radio.Button>
                </Radio.Group>
            </div>
            <div className="w-full pt-2">
                {activeTab === 'info' && <EmployeeInfo />}
                {activeTab === 'attendance' && <EmployeeAttendance />}
                {activeTab === 'devices' && <EmployeeDevices />}
            </div>
        </FlexBox>
    );
};

export { AdminEmployeeInfoPage };
