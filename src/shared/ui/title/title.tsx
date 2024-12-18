import { memo, ReactNode } from 'react';

export const Title = memo(
    ({
        children,
        className,
    }: {
        children: ReactNode;
        size?: 'xl';
        className?: string;
    }) => {
        return (
            <span
                className={`text-[14px] md:text-[16px] text-[#645e5e] font-semibold whitespace-nowrap ${className}`}
            >
                {children}
            </span>
        );
    },
);
