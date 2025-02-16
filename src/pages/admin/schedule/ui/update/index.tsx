import { FC, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useUpdateScheduleMutation } from '@/entities/schedule/api';
import { FlexBox, useAppActions, useAppSelector } from '@/shared';
import {
    IScheduleDayPost,
    ISchedulePatch,
} from '@/entities/schedule/model/types';
import { useTranslation } from 'react-i18next'

const AdminUpdateScheduleForm: FC = () => {
    const { t } = useTranslation();
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
            message.success(t('График работы успешно обновлен!'));
            setIsUpdatingSchedule(false);
        }
        if (isError) {
            message.error(t('Произошла ошибка при обновлении графика работы.'));
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
                label={t("Название рабочего графика")}
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
                <b>{t("День недели")}</b>
                <b className="ml-auto mr-10">{t("Начало рабочего дня")}</b>
                <b>{t("Конец рабочего дня")}</b>
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
                            <Input placeholder={`${t("Например")}: 10:00`} />
                        </Form.Item>
                        <Form.Item name={['work_hours', day.key, 'endTime']}>
                            <Input placeholder={`${t("Например")}: 18:00`} />
                        </Form.Item>
                    </FlexBox>
                ))}
            </FlexBox>
            <p className="text-sm mb-5 text-gray-400">
                {t("Оставьте пустым поле, если этот день должен быть выходным")}
            </p>
            <FlexBox>
                <Button onClick={onCancel} type="default">
                    {t("Отмена")}
                </Button>
                <Button loading={isLoading} type="primary" htmlType="submit">
                    {t("Сохранить")}
                </Button>
            </FlexBox>
        </Form>
    );
};

export { AdminUpdateScheduleForm };
