import { FlexBox, useAppSelector } from '@/shared'
import { AdminRolesPageHead } from './head'
import { AdminRolePageTable } from './table'
import { AdminCreateRoleForm } from './create'
import { AdminUpdateRoleForm } from './update'

const AdminRolesPage = () => {
  const { isCreatingRole, isUpdatingRole } = useAppSelector()
  return (
    <FlexBox cls='flex-col'>
      <AdminRolesPageHead />
      {isCreatingRole && <AdminCreateRoleForm />}
      {isUpdatingRole && <AdminUpdateRoleForm />}
      {!isCreatingRole && !isUpdatingRole && <AdminRolePageTable />}
    </FlexBox>
  )
}

export { AdminRolesPage }
