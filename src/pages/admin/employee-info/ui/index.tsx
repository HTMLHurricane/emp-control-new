import { useState } from 'react';
import { Button, Radio, RadioChangeEvent } from 'antd';
import { FlexBox } from '@/shared';
import { EmployeeInfo } from './employeeInfo/employeeInfo';
import { EmployeeAttendance } from './employeeAttendance/employeeAttendance';
import { EmployeeDevices } from './employeeDevices/employeeDevices';
import { useNavigate } from 'react-router-dom';

type Tab = 'info' | 'attendance' | 'devices';

const AdminEmployeeInfoPage = () => {
    const [activeTab, setActiveTab] = useState<Tab>('info');
    const handleTabChange = (e: RadioChangeEvent) => {
        setActiveTab(e.target.value as Tab); // Приведение значения к типу Tab
    };
    const navigate = useNavigate();

    return (
        <FlexBox cls="flex-col space-y-6">
            <div className="flex items-center justify-between mb-5">
                <Button
                    onClick={() => navigate('/employees')}
                    type="primary"
                    className="self-start"
                >
                    Назад
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
                        Информация о сотруднике
                    </Radio.Button>
                    <Radio.Button
                        value="attendance"
                        className="font-medium text-center"
                    >
                        Посещаемость
                    </Radio.Button>
                    <Radio.Button
                        value="devices"
                        className="font-medium text-center"
                    >
                        Камера
                    </Radio.Button>
                </Radio.Group>
            </div>
            <div className="w-full">
                {activeTab === 'info' && <EmployeeInfo />}
                {activeTab === 'attendance' && <EmployeeAttendance />}
                {activeTab === 'devices' && <EmployeeDevices />}
            </div>
        </FlexBox>
    );
};

export { AdminEmployeeInfoPage };
