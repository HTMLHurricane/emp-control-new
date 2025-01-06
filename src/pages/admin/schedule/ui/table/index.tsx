import {
    useDeleteScheduleMutation,
    useGetAllSchedulesQuery,
} from '@/entities/schedule/api';
import { ISchedule, IScheduleDay } from '@/entities/schedule/model/types';
import { DeleteButton, EditButton, useAppActions } from '@/shared';
import { columnResponseText } from '@/shared/const/css';
import { Table, TableProps, message } from 'antd';
import { useEffect } from 'react';

const AdminSchedulePageTable = () => {
    const { setScheduleForm, setIsUpdatingSchedule } = useAppActions();
    const { data, isLoading } = useGetAllSchedulesQuery();
    const [deleteSchedule, { isSuccess: deleteSuccess, isError: deleteError }] =
        useDeleteScheduleMutation();

    const handleEdit = (rec: ISchedule) => {
        setScheduleForm(rec);
        setIsUpdatingSchedule(true);
    };

    const columns: TableProps<ISchedule>['columns'] = [
        {
            title: 'Название',
            dataIndex: 'name',
            className: `${columnResponseText}`,
        },
        {
            title: 'Дни',
            dataIndex: 'work_hours',
            render: (_, rec) => {
                return (
                    <ul>
                        {rec?.work_hours?.map((day: IScheduleDay) => {
                            if (day.start_time && day.end_time) {
                                return (
                                    <li key={day.id}>
                                        {`${
                                            {
                                                MONDAY: 'Понедельник',
                                                TUESDAY: 'Вторник',
                                                WEDNESDAY: 'Среда',
                                                THURSDAY: 'Четверг',
                                                FRIDAY: 'Пятница',
                                                SATURDAY: 'Суббота',
                                                SUNDAY: 'Воскресенье',
                                            }[day.day_of_week] || ''
                                        } ${day.start_time.slice(
                                            0,
                                            5,
                                        )} - ${day.end_time.slice(0, 5)}`}
                                    </li>
                                );
                            }
                            return null;
                        })}
                    </ul>
                );
            },
            className: `${columnResponseText}`,
        },
        {
            title: '',
            dataIndex: 'actions',
            render: (_, rec) => (
                <div className="flex flex-col md:flex-row gap-1 md:gap-2 lg:gap-4">
                    <DeleteButton onConfirm={() => deleteSchedule(rec.id)} />
                    <EditButton onClick={() => handleEdit(rec)} />
                </div>
            ),
            className: `${columnResponseText}`,
        },
    ];

    useEffect(() => {
        if (deleteSuccess) {
            message.success('Успешно удалено');
        }
    }, [deleteSuccess]);

    useEffect(() => {
        if (deleteError) {
            message.error('Произошла ошибка во время удаления');
            console.log('error', deleteError);
        }
    }, [deleteError]);

    return (
        <Table
            loading={isLoading}
            scroll={{ x: true }}
            bordered
            columns={columns}
            rowKey={(el) => el.id}
            dataSource={data ?? []}
        />
    );
};

export { AdminSchedulePageTable };
