import { FlexBox, useAppActions, useAppSelector } from '@/shared';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next'
import { FaArrowLeft, FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const AdminRolesPageHead = () => {
    const {t} = useTranslation()
    const { isCreatingRole, isUpdatingRole } = useAppSelector();
    const { setIsCreatingRole } = useAppActions();
    const navigate = useNavigate();
    const handleCreate = () => {
        setIsCreatingRole(true);
    };

    return (
        <FlexBox cls="justify-between">
            <h2 className='header_title'>
                <FaArrowLeft
                    size={15}
                    className="mr-4 cursor-pointer hover:text-blue-300 duration-150"
                    onClick={() => navigate(-1)}
                />
                {t("Роли")}
            </h2>
            <FlexBox>
                {!isCreatingRole && !isUpdatingRole && (
                    <Button
                        icon={<FaPlus />}
                        type="primary"
                        onClick={handleCreate}
                    >
                        {t("Роль")}
                    </Button>
                )}
            </FlexBox>
        </FlexBox>
    );
};

export { AdminRolesPageHead };
