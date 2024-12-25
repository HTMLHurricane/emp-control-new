import { useCreateOrganizationMutation } from '@/entities/organization/api';
import { IOrganizationPost } from '@/entities/organization/model/types';
import { useAppActions } from '@/shared';
import { FormLayout } from '@/shared/ui/formLayout/formLayout';
import { Form, Input, Button, message } from 'antd';
import { useEffect } from 'react';

export const OrganizationCreateForm = () => {
    const [form] = Form.useForm();
    const [createOrganization, { isSuccess, isLoading, isError }] =
        useCreateOrganizationMutation();
    const { setIsCreatingOrganization } = useAppActions();

    const onSubmit = (data: IOrganizationPost) => {
        createOrganization(data);
    };

    const onCancel = () => {
        setIsCreatingOrganization(false);
        form.resetFields(['name']);
    };

    useEffect(() => {
        if (isSuccess) {
            message.success('Организация успешно создана');
            setIsCreatingOrganization(false);
        }
        if (isError) {
            message.error('Произошла ошибка во время создания организации');
            console.log('error', isError);
        }
    }, [isSuccess, isError]);

    useEffect(() => {
        return () => {
            onCancel();
        };
    }, []);

    return (
        <FormLayout title="Создать организацию" size="xl">
            <Form form={form} onFinish={onSubmit} layout="vertical">
                <Form.Item<IOrganizationPost>
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
