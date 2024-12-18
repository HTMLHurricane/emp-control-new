import { FlexBox, useAppSelector } from '@/shared'
import { AdminBranchPageHead } from './head'
import { AdminBranchPageTable } from './table'
import { AdminCreateBranchForm } from './create'
import { AdminUpdateBranchForm } from './update'
// import { BranchComeModal } from '@/entities/branch/model/modals/comeModal'
// import { BranchNotComeModal } from '@/entities/branch/model/modals/notComeModal'
// import { BranchLateModal } from '@/entities/branch/model/modals/lateModal'

const AdminBranchPage = () => {
  const { isCreatingBranch, isUpdatingBranch } = useAppSelector()

  return (
    <FlexBox cls="flex-col">
      <AdminBranchPageHead />
      {isCreatingBranch && <AdminCreateBranchForm />}
      {isUpdatingBranch && <AdminUpdateBranchForm />}
      {!isCreatingBranch && !isUpdatingBranch && <AdminBranchPageTable />}
      {/* <BranchComeModal />
      <BranchNotComeModal />
      <BranchLateModal /> */}
    </FlexBox>
  )
}

export { AdminBranchPage }
