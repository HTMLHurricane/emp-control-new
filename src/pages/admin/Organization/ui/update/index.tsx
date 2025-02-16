import { useUpdateOrganizationMutation } from '@/entities/organization/api';
import { useAppActions, useAppSelector } from '@/shared';
import { IdName } from '@/shared/types/Types';
import { FormLayout } from '@/shared/ui/formLayout/formLayout';
import { Form, Input, Button, message } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const OrganizationUpdateForm = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [updateOrganization, { isSuccess, isLoading, isError }] =
        useUpdateOrganizationMutation();
    const { setIsUpdatingOrganization } = useAppActions();
    const { organizationForm } = useAppSelector();

    const onSubmit = (data: IdName) => {
        updateOrganization({ id: organizationForm!.id!, name: data.name });
    };

    const onCancel = () => {
        setIsUpdatingOrganization(false);
        form.resetFields(['name']);
    };

    useEffect(() => {
        if (organizationForm) {
            form.setFieldsValue(organizationForm);
        }
    }, [organizationForm]);

    useEffect(() => {
        if (isSuccess) {
            message.success(t('Организация успешно изменена!'));
            setIsUpdatingOrganization(false);
        }
        if (isError) {
            message.error(t('Произошла ошибка во время редактирования.'));
            console.log('error', isError);
        }
    }, [isSuccess, isError]);

    useEffect(() => {
        return () => {
            onCancel();
        };
    }, []);

    return (
        <FormLayout title={t("Изменить название организации")} size="xl">
            <Form form={form} onFinish={onSubmit} layout="vertical">
                <Form.Item<IdName>
                    name="name"
                    label={t("Название организации")}
                    rules={[
                        {
                            required: true,
                            message: t('Пожалуйста, заполните поле!'),
                        },
                    ]}
                >
                    <Input />
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
