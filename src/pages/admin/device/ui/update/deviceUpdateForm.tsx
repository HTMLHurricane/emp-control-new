import { useUpdateDeviceMutation } from '@/entities/device/api';
import { IDevicePatch } from '@/entities/device/model/types';
import { useAppActions, useAppSelector } from '@/shared';
import { FormLayout } from '@/shared/ui/formLayout/formLayout';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next'

export const DeviceUpdateForm = () => {
    const [form] = Form.useForm();
    const {t} = useTranslation()
    const [createDevice, { isSuccess, isLoading, isError }] =
        useUpdateDeviceMutation();
    const { setIsUpdatingDevice } = useAppActions();
    const { deviceForm } = useAppSelector();

    useEffect(() => {
        if (deviceForm) {
            form.setFieldsValue(deviceForm);
        }
    }, [deviceForm]);

    const onSubmit = (data: IDevicePatch) => {
        createDevice({
            device_id: deviceForm!.id,
            id: data.id,
            is_active: data.is_active,
            name: data.name,
            path: data.path,
        });
    };

    const onCancel = () => {
        setIsUpdatingDevice(false);
        form.resetFields();
    };

    useEffect(() => {
        if (isSuccess) {
            message.success(t('Device успешно изменена'));
            setIsUpdatingDevice(false);
        }
        if (isError) {
            message.error(t('Произошла ошибка во время изменения device'));
            console.log('error', isError);
        }
    }, [isSuccess, isError]);

    useEffect(() => {
        return () => {
            onCancel();
        };
    }, []);

    return (
        <FormLayout title={t("Создать device")} size="xl">
            <Form form={form} onFinish={onSubmit} layout="vertical">
                <Form.Item<IDevicePatch>
                    name="name"
                    label={t("Название Device")}
                    rules={[
                        {
                            required: true,
                            message: t('Пожалуйста, заполните поле!'),
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<IDevicePatch>
                    name="path"
                    label="Path Device"
                    rules={[
                        {
                            required: true,
                            message: t('Пожалуйста, заполните поле!'),
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<IDevicePatch>
                    name="id"
                    label="ID Device"
                    rules={[
                        {
                            required: true,
                            message: t('Пожалуйста, заполните поле!'),
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<IDevicePatch>
                    name="is_active"
                    valuePropName="checked"
                >
                    <Checkbox>
                        <span className="ml-5">{t("Активность")}</span>
                    </Checkbox>
                </Form.Item>
                <div className="flex justify-end space-x-4">
                    <Button onClick={onCancel} type="default">
                        {t("Отмена")}
                    </Button>
                    <Button
                        loading={isLoading}
                        type="primary"
                        htmlType="submit"
                    >
                        {t("Сохранить")}
                    </Button>
                </div>
            </Form>
        </FormLayout>
    );
};
