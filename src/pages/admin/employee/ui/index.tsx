import { FlexBox, useAppSelector } from '@/shared'
import { AdminEmployeePageHead } from './head'
import { AdminEmployeePageTable } from './table'
import { AdminCreateEmployeeForm } from './create'
import { AdminUpdateEmployeeForm } from './update'

const AdminEmployeePage = () => {
  const { isCreatingEmployee, isUpdatingEmployee } = useAppSelector()
  
  return (
    <FlexBox cls='flex-col'>
      <AdminEmployeePageHead />
      {isCreatingEmployee && <AdminCreateEmployeeForm />}
      {isUpdatingEmployee && <AdminUpdateEmployeeForm />}
      {!isCreatingEmployee && !isUpdatingEmployee && <AdminEmployeePageTable />}
    </FlexBox>
  )
}

export { AdminEmployeePage }
