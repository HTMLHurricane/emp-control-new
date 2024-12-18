// import { useAppActions, useAppSelector } from '@/shared'
// import { Button, Modal, Table, TableProps } from 'antd'
// import { IEmployee } from '@/entities/employee/model/types'
// import { useNavigate } from 'react-router-dom'
// import { useGetNotComeDataQuery } from '@/entities/home/api'

// const columns: TableProps<IEmployee>['columns'] = [
//   {
//     title: 'Имя',
//     dataIndex: 'name',
//   },
//   {
//     title: 'Должность',
//     dataIndex: 'position',
//     render: (e) => e.name,
//   },
//   {
//     title: 'Подразделение',
//     dataIndex: 'branch',
//     render: (e) => e.name,
//   },
//   {
//     title: 'Время прихода',
//     dataIndex: 'schedule',
//     render: (el) => el.time_in.slice(0, 5),
//   },
//   {
//     title: 'Время отъезда',
//     dataIndex: 'schedule',
//     render: (el) => el.time_out.slice(0, 5),
//   },
//   {
//     title: 'Телефон',
//     dataIndex: 'phone',
//   },
// ]

// const BranchNotComeModal = () => {
//   const { setBranchNotComeModal } = useAppActions()
//   const { branchNotComeModal, branchDate, selectedBranchID } = useAppSelector()
//   const navigate = useNavigate()
//   const { data } = useGetNotComeDataQuery({
//     day: branchDate as string,
//     branch: selectedBranchID,
//     limit: 100,
//   })

//   const handleCancel = () => setBranchNotComeModal(false)

//   return (
//     <Modal
//       title="Отсутствовавшие"
//       open={branchNotComeModal}
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
//         size="small"
//         rowKey={(row) => row.id}
//         columns={columns}
//         pagination={false}
//         onRow={(rec) => ({
//           onClick: () => {
//             navigate(`/employees/${rec.id}`)
//             handleCancel()
//           },
//           className: 'hover:cursor-pointer',
//         })}
//       />
//     </Modal>
//   )
// }

// export { BranchNotComeModal }
