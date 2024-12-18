import { IdName } from '@/shared/types/Types';

export type IRolePost = Omit<IdName, 'id'> & { organization_id: number };
export type IRolePatch = Omit<IdName, 'id'>;

export interface IRoleSliceState {
    isCreatingRole: boolean;
    isUpdatingRole: boolean;
    roleForm: IdName | null;
    roleTablePage: number;
    roleTableLimit: number;
}
