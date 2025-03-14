import { useGetAllBranchesQuery } from '@/entities/branch/api';
import { useCreateDeviceMutation } from '@/entities/device/api';
import { IDevicePost } from '@/entities/device/model/types';
import { useGetOrganizationQuery } from '@/entities/organization/api';
import { useAppActions } from '@/shared';
import { mapToOptions } from '@/shared/lib/mapToOptions';
import { FormLayout } from '@/shared/ui/formLayout/formLayout';
import { Button, Form, Input, message, Select } from 'antd';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next'

export const DeviceCreateForm = () => {
    const {t} = useTranslation()
    const [form] = Form.useForm();
    const [createDevice, { isSuccess, isLoading, isError }] =
        useCreateDeviceMutation();
    const { setIsCreatingDevice } = useAppActions();
    const { data: organizations } = useGetOrganizationQuery();
    const { data: branches } = useGetAllBranchesQuery();
    const organizationOptions = useMemo(
        () => mapToOptions(organizations),
        [organizations],
    );
    const branchOptions = useMemo(() => mapToOptions(branches), [branches]);
    const onSubmit = (data: IDevicePost) => {
        createDevice(data);
    };

    const onCancel = () => {
        setIsCreatingDevice(false);
        form.resetFields();
    };

    useEffect(() => {
        if (isSuccess) {
            message.success(t('Device успешно создана'));
            setIsCreatingDevice(false);
        }
        if (isError) {
            message.error(t('Произошла ошибка во время создания device'));
            console.log('error', isError);
        }
    }, [isSuccess, isError]);

    useEffect(() => {
        return () => {
            onCancel();
        };
    }, []);

    return (
        <FormLayout title="Создать device" size="xl">
            <Form form={form} onFinish={onSubmit} layout="vertical">
                <Form.Item<IDevicePost>
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
                <Form.Item<IDevicePost>
                    name="path"
                    label={t("Path Device")}
                    rules={[
                        {
                            required: true,
                            message: t('Пожалуйста, заполните поле!'),
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<IDevicePost>
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
                <Form.Item<IDevicePost>
                    name="organization_id"
                    label={t("Организация")}
                    rules={[
                        {
                            required: true,
                            message: t('Пожалуйста, выберите организацию!'),
                        },
                    ]}
                >
                    <Select
                        disabled={!organizationOptions?.length}
                        options={organizationOptions}
                        placeholder={t("Выберите организацию")}
                    />
                </Form.Item>
                <Form.Item<IDevicePost>
                    name="branch_id"
                    label={t("Филиал")}
                    rules={[
                        {
                            required: true,
                            message: t('Пожалуйста, выберите филиал!'),
                        },
                    ]}
                >
                    <Select
                        disabled={!branchOptions?.length}
                        options={branchOptions}
                        placeholder={t("Выберите филиал")}
                    />
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
