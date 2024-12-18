import { FC, ReactNode } from 'react';

type Props = {
    children: ReactNode;
    cls?: string;
    gap?: string;
};

const FlexBox: FC<Props> = ({ children, cls, gap }) => {
    return (
        <div
            className={`flex ${
                gap ? `gap-${gap}` : ' gap-1 md:gap-2 lg:gap-5'
            } ${
                cls?.includes('flex-col')
                    ? cls
                    : cls?.includes('items-start')
                    ? cls
                    : `items-center ${cls}`
            }`}
        >
            {children}
        </div>
    );
};

export { FlexBox };
