import { useCheckUserQuery } from '@/entities/auth/api';
import { useCreateRoleMutation } from '@/entities/role/api';
import { IRolePost } from '@/entities/role/model/types';
import { TOKEN, useAppActions } from '@/shared';
import { FormLayout } from '@/shared/ui/formLayout/formLayout';
import { Button, Form, Input, message } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AdminCreateRoleForm = () => {
    const { t } = useTranslation();
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
            message.success(t('Роль успешно создана!'));
            setIsCreatingRole(false);
        }
        if (isError) {
            message.error(t('Произошла ошибка во время создания роли.'));
            console.log('error', isError);
        }
    }, [isSuccess, isError]);

    useEffect(() => {
        return () => {
            onCancel();
        };
    }, []);

    return (
        <FormLayout title={t("Создать роль")} size="2xl">
            <Form
                form={form}
                onFinish={onSubmit}
                layout="vertical"
                className="space-y-4"
            >
                <Form.Item<IRolePost>
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

export { AdminCreateRoleForm };
