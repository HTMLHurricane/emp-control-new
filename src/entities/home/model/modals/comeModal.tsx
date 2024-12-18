// import { useAppActions, useAppSelector } from '@/shared';
// import { Button, Modal, Table, TableProps } from 'antd';
// import { useGetComeDataQuery } from '../../api';
// import { IEmployee } from '@/entities/employee/model/types';
// import { useNavigate } from 'react-router-dom';
// import { columnResponseText } from '@/shared/const/css';

// const columns: TableProps<Omit<IEmployee, 'phone'>>['columns'] = [
//     {
//         title: 'Имя',
//         dataIndex: 'name',
//         className: `${columnResponseText}`,
//     },
//     {
//         title: 'Должность',
//         dataIndex: 'position',
//         render: (e) => e.name,
//         className: `${columnResponseText}`,
//     },
//     {
//         title: 'Подразделение',
//         dataIndex: 'branch',
//         render: (e) => e.name,
//         className: `${columnResponseText}`,
//     },
//     {
//         title: 'Время прихода',
//         dataIndex: 'schedule',
//         render: (el) => el.time_in.slice(0, 5),
//         className: `${columnResponseText}`,
//         responsive: ['md', 'lg', 'xl'],
//     },
//     {
//         title: 'Время отъезда',
//         dataIndex: 'schedule',
//         render: (el) => el.time_out.slice(0, 5),
//         className: `${columnResponseText}`,
//         responsive: ['md', 'lg', 'xl'],
//     },
// ];

// const ComeModal = () => {
//     const { setIsComeModal } = useAppActions();
//     const { isComeModal, homeDate, branch } = useAppSelector();
//     const navigate = useNavigate();
//     const { data } = useGetComeDataQuery({
//         day: homeDate.format('YYYY-MM-DD'),
//         branch: branch,
//         limit: 100,
//     });

//     const handleCancel = () => setIsComeModal(false);

//     return (
//         <Modal
//             title="Присутствовавшие"
//             open={isComeModal}
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
//                 size="small"
//                 rowKey={(row) => row.id}
//                 columns={columns}
//                 onRow={(rec) => ({
//                     onClick: () => {
//                         navigate(`employees/${rec.id}`);
//                         handleCancel();
//                     },
//                     className: 'hover:cursor-pointer',
//                 })}
//                 pagination={false}
//             />
//         </Modal>
//     );
// };

// export { ComeModal };
