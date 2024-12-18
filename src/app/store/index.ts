import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as auth } from '@/entities/auth/model/slices/index.slice';
import { reducer as branch } from '@/entities/branch/model/slices/index.slice';
import { reducer as role } from '@/entities/role/model/slices/index.slice';
import { reducer as employee } from '@/entities/employee/model/slices/index.slice';
import { reducer as home } from '@/entities/home/model/slices/index.slice';
import { reducer as schedule } from '@/entities/schedule/model/slices/index.slice';
import { reducer as organization } from '@/entities/organization/model/slices/organization.slice';
import { reducer as device } from '@/entities/device/model/slices/index.slice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from '@/shared/api';

const reducers = combineReducers({
    auth,
    branch,
    role,
    employee,
    home,
    schedule,
    organization,
    device,
    [api.reducerPath]: api.reducer,
});

export const store = configureStore({
    reducer: reducers,
    middleware: (getDM) =>
        getDM({ serializableCheck: false }).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);
