import { useUpdateRoleMutation } from '@/entities/role/api';
import { IRolePatch } from '@/entities/role/model/types';
import { useAppActions, useAppSelector } from '@/shared';
import { FormLayout } from '@/shared/ui/formLayout/formLayout';
import { Button, Form, Input, message } from 'antd';
import { useEffect } from 'react';

const AdminUpdateRoleForm = () => {
    const [form] = Form.useForm();
    const [updateRole, { isSuccess, isLoading, isError }] =
        useUpdateRoleMutation();
    const { roleForm } = useAppSelector();
    const { setIsUpdatingRole } = useAppActions();

    const onSubmit = (data: IRolePatch) => {
        updateRole({ id: roleForm!.id, ...data });
    };

    const onCancel = () => {
        setIsUpdatingRole(false);
        form.resetFields(['name']);
    };

    useEffect(() => {
        if (roleForm) {
            form.setFieldsValue(roleForm);
        }
    }, [roleForm]);

    useEffect(() => {
        if (isSuccess) {
            message.success('Роль успешно изменён');
            setIsUpdatingRole(false);
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
        <FormLayout title="Изменить название роли" size='xl'>
            <Form
                form={form}
                onFinish={onSubmit}
                layout="vertical"
            >
                <Form.Item<IRolePatch>
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

export { AdminUpdateRoleForm };
