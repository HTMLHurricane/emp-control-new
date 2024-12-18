import { useAppSelector } from '@/shared';
import { OrganizationHead } from './head';
import { OrganizationCreateForm } from './create';
import { OrganizationUpdateForm } from './update';
import { OrganizationTable } from './table';

export const Organization = () => {
    const { isCreatingOrganization, isUpdatingOrganization } = useAppSelector();
    return (
        <>
            <OrganizationHead />
            {isCreatingOrganization && <OrganizationCreateForm />}
            {isUpdatingOrganization && <OrganizationUpdateForm />}
            {!isCreatingOrganization && !isUpdatingOrganization && (
                <OrganizationTable />
            )}
        </>
    );
};
