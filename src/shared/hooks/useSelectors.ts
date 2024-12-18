import { RootState } from '@/app/store';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const useGlobalSelectors: TypedUseSelectorHook<RootState> = useSelector;

export const useAppSelector = () => {
    const {
        auth,
        branch,
        role,
        employee,
        home,
        schedule,
        organization,
        device,
    } = useGlobalSelectors((s) => s);
    return {
        ...auth,
        ...branch,
        ...role,
        ...employee,
        ...home,
        ...schedule,
        ...organization,
        ...device,
    };
};
