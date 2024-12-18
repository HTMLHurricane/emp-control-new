import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { actions as auth } from '@/entities/auth/model/slices/index.slice';
import { actions as branch } from '@/entities/branch/model/slices/index.slice';
import { actions as role } from '@/entities/role/model/slices/index.slice';
import { actions as employee } from '@/entities/employee/model/slices/index.slice';
import { actions as home } from '@/entities/home/model/slices/index.slice';
import { actions as schedule } from '@/entities/schedule/model/slices/index.slice';
import { actions as organization } from '@/entities/organization/model/slices/organization.slice';
import { actions as device } from '@/entities/device/model/slices/index.slice';

const rootActions = {
    ...auth,
    ...branch,
    ...role,
    ...employee,
    ...home,
    ...schedule,
    ...organization,
    ...device,
};

export const useAppActions = () => {
    const dispatch = useDispatch();
    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
