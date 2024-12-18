// import { useGetLateDataQuery } from '@/entities/home/api'
// import { IHomeLate } from '@/entities/home/model'
// import { useAppActions, useAppSelector } from '@/shared'
// import { Button, Modal, Table, TableProps } from 'antd'
// import { useNavigate } from 'react-router-dom'

// const columns: TableProps<IHomeLate>['columns'] = [
//   {
//     title: 'Имя',
//     dataIndex: 'name',
//   },
//   {
//     title: 'Должность',
//     dataIndex: 'position',
//   },
//   {
//     title: 'Время прихода',
//     dataIndex: 'attendance_time',
//   },
//   {
//     title: 'Опоздал(а) на n минут',
//     dataIndex: 'late_by_time',
//   },
//   {
//     title: 'Начало рабочего времени',
//     dataIndex: 'time_in',
//   },
// ]

// const BranchLateModal = () => {
//   const { setBranchLateModal } = useAppActions()
//   const { branchLateModal, branchDate, selectedBranchID } = useAppSelector()
//   const navigate = useNavigate()
//   const { data } = useGetLateDataQuery({
//     day: branchDate as string,
//     branch: selectedBranchID,
//     limit: 100
//   })

//   const handleCancel = () => setBranchLateModal(false)

//   return (
//     <Modal
//       title="Опоздавшие"
//       open={branchLateModal}
//       onCancel={handleCancel}
//       footer={
//         <Button onClick={handleCancel} key="back" type="primary">
//           Закрыть
//         </Button>
//       }
//       width={1000}
//     >
//       <Table
//         scroll={{ y: 300 }}
//         dataSource={data?.data}
//         rowKey={(row) => row.user_id}
//         columns={columns}
//         pagination={false}
//         size='small'
//         onRow={(rec) => ({
//           onClick: () => {
//             navigate(`/employees/${rec.user_id}`)
//             handleCancel()
//           },
//           className: 'hover:cursor-pointer',
//         })}
//       />
//     </Modal>
//   )
// }

// export { BranchLateModal }
