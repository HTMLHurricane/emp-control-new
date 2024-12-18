import { FlexBox, useAppActions, useAppSelector } from '@/shared';
import { Button } from 'antd';
import { FaArrowLeft, FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const AdminSchedulePageHead = () => {
    const { isCreatingSchedule, isUpdatingBranch } = useAppSelector();
    const { setIsCreatingSchedule } = useAppActions();
    const navigate = useNavigate();
    const handleCreate = () => setIsCreatingSchedule(true);

    return (
        <FlexBox cls="justify-between">
            <h2 className='header_title'>
                <FaArrowLeft
                    size={15}
                    className="mr-4 cursor-pointer hover:text-blue-300 duration-150"
                    onClick={() => navigate(-1)}
                />
                Рабочие графики
            </h2>
            <FlexBox>
                {!isCreatingSchedule && !isUpdatingBranch && (
                    <Button
                        icon={<FaPlus />}
                        type="primary"
                        onClick={handleCreate}
                    >
                        Рабочий график
                    </Button>
                )}
            </FlexBox>
        </FlexBox>
    );
};

export { AdminSchedulePageHead };
