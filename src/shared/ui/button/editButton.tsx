import { Button } from 'antd';
import { FC } from 'react';
import { BsPencil } from 'react-icons/bs';

type Props = {
    onClick: () => void;
};

const EditButton: FC<Props> = ({ onClick }) => {
    return (
        <Button
            className="text-[12px] md:text-[14px]"
            onClick={onClick}
            type="primary"
            icon={<BsPencil />}
        >
            {/* <div className="hidden xl:block">Редактировать</div> */}
        </Button>
    );
};

export { EditButton };
