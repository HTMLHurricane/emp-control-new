import { Popconfirm, Button } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next'
import { BsTrash } from 'react-icons/bs';

type Props = {
    onConfirm: () => void;
};

const DeleteButton: FC<Props> = ({ onConfirm }) => {
    const {t} = useTranslation()
    return (
        <Popconfirm
            onConfirm={() => onConfirm()}
            title={t("Вы действительно хотите удалить?")}
        >
            <Button
                type="primary"
                icon={<BsTrash />}
                className="text-[12px] md:text-[14px]"
                danger
            >
                {/* <div className="hidden xl:block">Удалить</div> */}
            </Button>
        </Popconfirm>
    );
};

export { DeleteButton };
