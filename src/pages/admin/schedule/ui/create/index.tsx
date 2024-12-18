import { FC, useEffect, useMemo } from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import { useCreateScheduleMutation } from '@/entities/schedule/api';
import { FlexBox, useAppActions } from '@/shared';
import {
    ISchedulePost,
    IScheduleDayPost,
} from '@/entities/schedule/model/types';
import { useGetOrganizationQuery } from '@/entities/organization/api';
import { mapToOptions } from '@/shared/lib/mapToOptions';

const AdminCreateScheduleForm: FC = () => {
    const [form] = Form.useForm<ISchedulePost>();
    const [createSchedule, { isSuccess, isLoading, isError }] =
        useCreateScheduleMutation();
    const { setIsCreatingSchedule } = useAppActions();
    const { data: organizations } = useGetOrganizationQuery();

    const organizationOptions = useMemo(
        () => mapToOptions(organizations),
        [organizations],
    );

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
        ).map((day: any) =>
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

        createSchedule({
            name: data.name,
            organization_id: 43, // Можно сделать параметром для большей гибкости
            work_hours: workHours,
        });
    };

    const onCancel = () => {
        setIsCreatingSchedule(false);
        form.resetFields();
    };

    useEffect(() => {
        if (isSuccess) {
            message.success('График работы успешно создан');
            setIsCreatingSchedule(false);
        }
        if (isError) {
            message.error('Произошла ошибка при создании графика работы');
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
            <Form.Item
                name="organization_id"
                label="Организация"
                rules={[
                    { required: true, message: 'Пожалуйста, заполните поле!' },
                ]}
                className="max-w-[600px]"
            >
                <Select
                    disabled={!organizationOptions?.length}
                    options={organizationOptions}
                />
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

export { AdminCreateScheduleForm };
