import { FC, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useUpdateScheduleMutation } from '@/entities/schedule/api';
import { FlexBox, useAppActions, useAppSelector } from '@/shared';
import {
    IScheduleDayPost,
    ISchedulePatch,
} from '@/entities/schedule/model/types';

const AdminUpdateScheduleForm: FC = () => {
    const [form] = Form.useForm<ISchedulePatch>();
    const [updateSchedule, { isSuccess, isLoading, isError }] =
        useUpdateScheduleMutation();
    const { scheduleForm } = useAppSelector();
    const { setIsUpdatingSchedule } = useAppActions();

    // Преобразование work_hours в формат, который ожидает форма
    useEffect(() => {
        if (scheduleForm) {
            // Преобразуем данные work_hours в нужный формат
            const workHours = scheduleForm.work_hours.reduce((acc: any, day) => {
                const dayKey =
                    day.day_of_week.toLowerCase() as keyof ISchedulePatch['work_hours'];
                acc[dayKey] = {
                    startTime: day.start_time || '',
                    endTime: day.end_time || '',
                    status: day.status, // Добавляем status
                    day_of_week: day.day_of_week, // Добавляем day_of_week
                };
                return acc;
            }, {} as Record<string, { startTime: string; endTime: string; status: 'WORK' | 'REST'; day_of_week: string }>);

            form.setFieldsValue({
                ...scheduleForm,
                work_hours: workHours,
            });
        }
    }, [scheduleForm, form]);
    const onCancel = () => {
        setIsUpdatingSchedule(false);
        form.resetFields(['work_hours', 'start_time', 'end_time']);
    };
    const generateDayData = (
        day:
            | 'monday'
            | 'tuesday'
            | 'wednesday'
            | 'thursday'
            | 'friday'
            | 'saturday'
            | 'sunday',
        data: { startTime?: string; endTime?: string },
    ): IScheduleDayPost => {
        const startTime = data?.startTime || null;
        const endTime = data?.endTime || null;
        const status = startTime && endTime ? 'WORK' : 'REST';

        const dayOfWeekMap: Record<string, IScheduleDayPost['day_of_week']> = {
            monday: 'MONDAY',
            tuesday: 'TUESDAY',
            wednesday: 'WEDNESDAY',
            thursday: 'THURSDAY',
            friday: 'FRIDAY',
            saturday: 'SATURDAY',
            sunday: 'SUNDAY',
        };

        return {
            day_of_week: dayOfWeekMap[day] || 'REST',
            start_time: startTime,
            end_time: endTime,
            status,
        };
    };

    const onSubmit = (data: any) => {
        const workHours: any = Object.keys(
            data.work_hours || {},
        ).map((day) =>
            generateDayData(
                day as
                    | 'monday'
                    | 'tuesday'
                    | 'wednesday'
                    | 'thursday'
                    | 'friday'
                    | 'saturday'
                    | 'sunday',
                data.work_hours[day],
            ),
        );

        updateSchedule({
            name: data.name,
            id: scheduleForm!.id,
            work_hours: workHours,
        });
    };

    useEffect(() => {
        if (isSuccess) {
            message.success('График работы успешно обновлен');
            setIsUpdatingSchedule(false);
        }
        if (isError) {
            message.error('Произошла ошибка при обновлении графика работы');
        }
    }, [isSuccess, isError]);

    useEffect(() => {
        return () => {
            onCancel();
        };
    }, []);

    const daysOfWeek = [
        { label: 'Понедельник', key: 'monday' },
        { label: 'Вторник', key: 'tuesday' },
        { label: 'Среда', key: 'wednesday' },
        { label: 'Четверг', key: 'thursday' },
        { label: 'Пятница', key: 'friday' },
        { label: 'Суббота', key: 'saturday' },
        { label: 'Воскресенье', key: 'sunday' },
    ];

    return (
        <Form form={form} onFinish={onSubmit} layout="vertical">
            <Form.Item
                className="max-w-[600px]"
                label="Название рабочего графика"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Введите название рабочего графика',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <FlexBox cls="max-w-[600px] mb-5">
                <b>День недели</b>
                <b className="ml-auto mr-10">Начало рабочего дня</b>
                <b>Конец рабочего дня</b>
            </FlexBox>
            <FlexBox gap="0" cls="flex-col max-w-[600px]">
                {daysOfWeek.map((day) => (
                    <FlexBox key={day.key}>
                        <Form.Item style={{ width: 150 }}>
                            <b>{day.label}</b>
                        </Form.Item>
                        <Form.Item
                            name={['work_hours', day.key, 'startTime']}
                            style={{ marginLeft: 'auto' }}
                        >
                            <Input placeholder="Например: 10:00" />
                        </Form.Item>
                        <Form.Item name={['work_hours', day.key, 'endTime']}>
                            <Input placeholder="Например: 18:00" />
                        </Form.Item>
                    </FlexBox>
                ))}
            </FlexBox>
            <p className="text-sm mb-5 text-gray-400">
                Оставьте пустым поле, если этот день должен быть выходным
            </p>
            <FlexBox>
                <Button onClick={onCancel} type="default">
                    Отмена
                </Button>
                <Button loading={isLoading} type="primary" htmlType="submit">
                    Сохранить
                </Button>
            </FlexBox>
        </Form>
    );
};

export { AdminUpdateScheduleForm };
