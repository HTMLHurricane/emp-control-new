import { IdName } from '@/shared/types/Types';

export type IOrganizationPost = Omit<IdName, 'id'>;

export interface IOrganizationSliceState {
    isCreatingOrganization: boolean;
    isUpdatingOrganization: boolean;
    organizationForm: IdName | null;
}
