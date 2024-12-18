import { useUpdateOrganizationMutation } from '@/entities/organization/api';
import { useAppActions, useAppSelector } from '@/shared';
import { IdName } from '@/shared/types/Types';
import { FormLayout } from '@/shared/ui/formLayout/formLayout';
import { Form, Input, Button, message } from 'antd';
import { useEffect } from 'react';

export const OrganizationUpdateForm = () => {
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
            message.success('Организация успешно изменена');
            setIsUpdatingOrganization(false);
        }
        if (isError) {
            message.error('Произошла ошибка во время редактирования');
            console.log('error', isError);
        }
    }, [isSuccess, isError]);

    useEffect(() => {
        return () => {
            onCancel();
        };
    }, []);

    return (
        <FormLayout title="Изменить название организации" size="2xl">
            <Form form={form} onFinish={onSubmit} layout="vertical">
                <Form.Item<IdName>
                    name="name"
                    label="Название организации"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, заполните поле!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <div className="flex justify-end space-x-4">
                    <Button onClick={onCancel} type="default">
                        Отмена
                    </Button>
                    <Button
                        loading={isLoading}
                        type="primary"
                        htmlType="submit"
                    >
                        Сохранить
                    </Button>
                </div>
            </Form>
        </FormLayout>
    );
};
