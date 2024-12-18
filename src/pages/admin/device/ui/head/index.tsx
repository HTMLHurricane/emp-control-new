import { useAppActions, useAppSelector } from '@/shared';
import { Button } from 'antd';
import { FaArrowLeft, FaUserPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

export const DeviceHead = () => {
    const { isCreatingDevice, isUpdatingDevice } = useAppSelector();
    const { setIsCreatingDevice } = useAppActions();

    const navigate = useNavigate();

    const handleCreate = () => {
        setIsCreatingDevice(true);
    };

    return (
        <div className="flex justify-between items-center">
            <h2 className="header_title">
                <FaArrowLeft
                    size={15}
                    className="mr-4 cursor-pointer hover:text-blue-300 duration-150"
                    onClick={() => navigate(-1)}
                />
                Устройства
            </h2>
            {!isCreatingDevice && !isUpdatingDevice && (
                <div className="flex">
                    <Button
                        icon={<FaUserPlus />}
                        type="primary"
                        onClick={handleCreate}
                        className="text-[14px] md:ml-4 ml-2"
                    >
                        <div className="hidden md:block">
                            Добавить Устройство
                        </div>
                    </Button>
                </div>
            )}
        </div>
    );
};
