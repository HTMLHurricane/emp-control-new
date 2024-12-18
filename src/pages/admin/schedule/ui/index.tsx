import { FlexBox, useAppSelector } from '@/shared'
import { AdminCreateScheduleForm } from './create'
import { AdminSchedulePageHead } from './head'
import { AdminSchedulePageTable } from './table'
import { AdminUpdateScheduleForm } from './update'

const AdminSchedulePage = () => {
  const { isCreatingSchedule, isUpdatingSchedule } = useAppSelector()
  return (
    <FlexBox cls="flex-col">
      <AdminSchedulePageHead />
      {isCreatingSchedule && <AdminCreateScheduleForm />}
      {isUpdatingSchedule && <AdminUpdateScheduleForm />}
      {!isCreatingSchedule && !isUpdatingSchedule && <AdminSchedulePageTable />}
    </FlexBox>
  )
}

export { AdminSchedulePage }
