// import { useAppActions, useAppSelector } from '@/shared';
// import { Button, Modal, Table, TableProps } from 'antd';
// import { useGetLateDataQuery } from '../../api';
// import { IHomeLate } from '../types';
// import { useNavigate } from 'react-router-dom';
// import { columnResponseText } from '@/shared/const/css';

// const columns: TableProps<IHomeLate>['columns'] = [
//     {
//         title: 'Имя',
//         dataIndex: 'name',
//         className: `${columnResponseText}`,
//     },
//     {
//         title: 'Должность',
//         dataIndex: 'position',
//         className: `${columnResponseText}`,
//     },
//     {
//         title: 'Время прихода',
//         dataIndex: 'attendance_time',
//         className: `${columnResponseText}`,
//         responsive: ['md', 'lg', 'xl'],
//     },
//     {
//         title: 'Опоздал(а) на n минут',
//         dataIndex: 'late_by_time',
//         className: `${columnResponseText}`,
//     },
//     {
//         title: 'Начало рабочего времени',
//         dataIndex: 'time_in',
//         className: `${columnResponseText}`,
//     },
// ];

// const LateModal = () => {
//     const { setIsLateModal } = useAppActions();
//     const { isLateModal, homeDate, branch } = useAppSelector();
//     const navigate = useNavigate();
//     const { data } = useGetLateDataQuery({
//         day: homeDate.format('YYYY-MM-DD'),
//         branch: branch,
//         limit: 100,
//     });

//     const handleCancel = () => setIsLateModal(false);

//     return (
//         <Modal
//             title="Опоздавшие"
//             open={isLateModal}
//             onCancel={handleCancel}
//             footer={
//                 <Button onClick={handleCancel} key="back" type="primary">
//                     Закрыть
//                 </Button>
//             }
//             width={1000}
//         >
//             <Table
//                 scroll={{ y: 300 }}
//                 dataSource={data?.data}
//                 rowKey={(row) => row.user_id}
//                 size="small"
//                 columns={columns}
//                 pagination={false}
//                 onRow={(rec) => ({
//                     onClick: () => {
//                         navigate(`employees/${rec.user_id}`);
//                         handleCancel();
//                     },
//                     className: 'hover:cursor-pointer',
//                 })}
//             />
//         </Modal>
//     );
// };

// export { LateModal };
