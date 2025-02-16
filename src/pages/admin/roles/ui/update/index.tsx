import { useUpdateRoleMutation } from '@/entities/role/api';
import { IRolePatch } from '@/entities/role/model/types';
import { useAppActions, useAppSelector } from '@/shared';
import { FormLayout } from '@/shared/ui/formLayout/formLayout';
import { Button, Form, Input, message } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next'

const AdminUpdateRoleForm = () => {
    const { t } = useTranslation();
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
            message.success(t('Роль успешно изменена!'));
            setIsUpdatingRole(false);
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
        <FormLayout title={t("Изменить название роли")} size='xl'>
            <Form
                form={form}
                onFinish={onSubmit}
                layout="vertical"
            >
                <Form.Item<IRolePatch>
                    name="name"
                    label={t("Название роли")}
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

export { AdminUpdateRoleForm };
