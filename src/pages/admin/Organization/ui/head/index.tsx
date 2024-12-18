import { useAppActions, useAppSelector } from '@/shared';
import { Button } from 'antd';
import { FaArrowLeft, FaUserPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const OrganizationHead = () => {
    const { isCreatingOrganization, isUpdatingOrganization } = useAppSelector();
    const { setIsCreatingOrganization } = useAppActions();
    const navigate = useNavigate();

    const handleCreate = () => {
        setIsCreatingOrganization(true);
    };

    return (
        <div className="flex justify-between items-center">
            <h2 className="header_title">
                <FaArrowLeft
                    size={15}
                    className="mr-4 cursor-pointer hover:text-blue-300 duration-150"
                    onClick={() => navigate(-1)}
                />
                Организации
            </h2>
            {!isCreatingOrganization && !isUpdatingOrganization && (
                <div className="flex">
                    <Button
                        icon={<FaUserPlus />}
                        type="primary"
                        onClick={handleCreate}
                        className="text-[14px] md:ml-4 ml-2"
                    >
                        <div className="hidden md:block">
                            Добавить Организацию
                        </div>
                    </Button>
                </div>
            )}
        </div>
    );
};

export { OrganizationHead };
