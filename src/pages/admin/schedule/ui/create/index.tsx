import { FC, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useCreateScheduleMutation } from '@/entities/schedule/api';
import { FlexBox, TOKEN, useAppActions } from '@/shared';
import {
    ISchedulePost,
    IScheduleDayPost,
} from '@/entities/schedule/model/types';
import { useCheckUserQuery } from '@/entities/auth/api';
import { useTranslation } from 'react-i18next';

const AdminCreateScheduleForm: FC = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm<ISchedulePost>();
    const [createSchedule, { isSuccess, isLoading, isError }] =
        useCreateScheduleMutation();
    const { setIsCreatingSchedule } = useAppActions();
    const token = TOKEN.get();
    const { data: getmeData } = useCheckUserQuery(token as string);

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
        const workHours: any = Object.keys(data.work_hours || {}).map(
            (day: any) =>
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
            organization_id: getmeData!.org, // Можно сделать параметром для большей гибкости
            work_hours: workHours,
        });
    };

    const onCancel = () => {
        setIsCreatingSchedule(false);
        form.resetFields();
    };

    useEffect(() => {
        if (isSuccess) {
            message.success(t('График работы успешно создан!'));
            setIsCreatingSchedule(false);
        }
        if (isError) {
            message.error(t('Произошла ошибка при создании графика работы.'));
        }
    }, [isSuccess, isError]);

    useEffect(() => {
        return () => {
            onCancel();
        };
    }, []);

    const daysOfWeek = [
        { label: t('Понедельник'), key: 'monday' },
        { label: t('Вторник'), key: 'tuesday' },
        { label: t('Среда'), key: 'wednesday' },
        { label: t('Четверг'), key: 'thursday' },
        { label: t('Пятница'), key: 'friday' },
        { label: t('Суббота'), key: 'saturday' },
        { label: t('Воскресенье'), key: 'sunday' },
    ];

    return (
        <Form form={form} onFinish={onSubmit} layout="vertical">
            <Form.Item
                className="max-w-[600px]"
                label={t('Название рабочего графика')}
                name="name"
                rules={[
                    {
                        required: true,
                        message: t('Введите название рабочего графика'),
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <FlexBox cls="max-w-[600px] mb-5">
                <b>{t('День недели')}</b>
                <b className="ml-auto mr-10">{t('Начало рабочего дня')}</b>
                <b>{t('Конец рабочего дня')}</b>
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
                            <Input placeholder={`${t('Например')}: 10:00`} />
                        </Form.Item>
                        <Form.Item name={['work_hours', day.key, 'endTime']}>
                            <Input placeholder={`${t('Например')}: 18:00`} />
                        </Form.Item>
                    </FlexBox>
                ))}
            </FlexBox>
            <p className="text-sm mb-5 text-gray-400">
                {t('Оставьте пустым поле, если этот день должен быть выходным')}
            </p>
            <FlexBox>
                <Button onClick={onCancel} type="default">
                    {t('Отмена')}
                </Button>
                <Button loading={isLoading} type="primary" htmlType="submit">
                    {t('Сохранить')}
                </Button>
            </FlexBox>
        </Form>
    );
};

export { AdminCreateScheduleForm };
