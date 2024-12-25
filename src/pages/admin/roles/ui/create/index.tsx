import { useCheckUserQuery } from '@/entities/auth/api';
import { useCreateRoleMutation } from '@/entities/role/api';
import { IRolePost } from '@/entities/role/model/types';
import { TOKEN, useAppActions } from '@/shared';
import { FormLayout } from '@/shared/ui/formLayout/formLayout';
import { Button, Form, Input, message } from 'antd';
import { useEffect } from 'react';

const AdminCreateRoleForm = () => {
    const [form] = Form.useForm();
    const [createRole, { isSuccess, isLoading, isError }] =
        useCreateRoleMutation();
    const { setIsCreatingRole } = useAppActions();
    const token = TOKEN.get();
    const { data: getmeData } = useCheckUserQuery(token as string);
    const onSubmit = (data: Omit<IRolePost, 'organization_id'>) => {
        createRole({ organization_id: getmeData!.org, ...data });
    };

    const onCancel = () => {
        setIsCreatingRole(false);
        form.resetFields(['name']);
    };

    useEffect(() => {
        if (isSuccess) {
            message.success('Роль успешно создан');
            setIsCreatingRole(false);
        }
        if (isError) {
            message.error('Произошла ошибка во время создания роли');
            console.log('error', isError);
        }
    }, [isSuccess, isError]);

    useEffect(() => {
        return () => {
            onCancel();
        };
    }, []);

    return (
        <FormLayout title="Создать роль" size="2xl">
            <Form
                form={form}
                onFinish={onSubmit}
                layout="vertical"
                className="space-y-4"
            >
                <Form.Item<IRolePost>
                    name="name"
                    label="Название роли"
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

export { AdminCreateRoleForm };
