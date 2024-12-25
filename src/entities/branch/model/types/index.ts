import { IAttendanceStats, IdName } from '@/shared/types/Types';

export interface IBranch extends IdName {
    organization_id: number;
    is_active: boolean;
    address: string;
}

export type IBranchesInfo = Omit<IBranch, 'organization_id'> & IAttendanceStats;
export type IBranchPost = Omit<IBranch, 'id'>;
export type IBranchPatch = Omit<IBranch, 'organization_id'>;
export type IBranchResponse = IBranch & { created_at: string };

export interface IBranchSliceState {
    isCreatingBranch: boolean;
    isUpdatingBranch: boolean;
    branchForm: IBranchPatch | null;
    branchDate: string;
}

export interface IBranchParams {
    date: string;
    branch_id: number;
}
