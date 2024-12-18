import { Card as CardA, CardProps } from 'antd';
import { FC, memo } from 'react';
import styled from 'styled-components';

const StyledCard = styled(CardA)`
    padding: 16px;
    margin: 16px;
    border-radius: 8px;

    /* Адаптивные отступы для различных ширин экранов */
    @media (max-width: 640px) {
        /* sm */
        margin: 8px 0px;
        padding: 8px 0px;
    }

    @media (min-width: 641px) and (max-width: 768px) {
        /* md */
        margin: 12px;
        padding: 14px;
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        /* lg */
        margin: 12px;
        padding: 16px;
    }

    @media (min-width: 1025px) {
        /* xl */
        margin: 12px;
        padding: 20px;
    }
`;

const Card: FC<CardProps> = memo(({ children, ...props }) => {
    return (
        <StyledCard
            styles={{
                body: {
                    padding: 0, // Убираем отступы
                },
            }}
            {...props}
        >
            {children}
        </StyledCard>
    );
});

export { Card };
