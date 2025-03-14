import { useUpdateBranchMutation } from '@/entities/branch/api';
import { IBranchPatch } from '@/entities/branch/model/types';
import { useAppActions, useAppSelector } from '@/shared';
import { FormLayout } from '@/shared/ui/formLayout/formLayout';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next'

const AdminUpdateBranchForm = () => {
    const {t } = useTranslation() 
    const [form] = Form.useForm();
    const [updateBranch, { isSuccess, isLoading, isError }] =
        useUpdateBranchMutation();
    const { branchForm } = useAppSelector();
    const { setIsUpdatingBranch } = useAppActions();

    const onSubmit = (data: IBranchPatch) => {
        updateBranch(data);
    };

    const onCancel = () => {
        setIsUpdatingBranch(false);
        form.resetFields(['name', 'address', 'is_active']);
    };

    useEffect(() => {
        if (branchForm) {
            form.setFieldsValue(branchForm);
        }
    }, [branchForm]);

    useEffect(() => {
        if (isSuccess) {
            message.success(t('Филиал успешно изменён'));
            setIsUpdatingBranch(false);
        }
        if (isError) {
            message.error(t('Произошла ошибка во время редактирования'));
            console.log('error', isError);
        }
    }, [isSuccess, isError]);

    useEffect(() => {
        return () => {
            onCancel();
        };
    }, []);

    return (
        <FormLayout title={t("Изменить данные филиала")} size="xl">
            <Form
                form={form}
                className="space-y-4"
                onFinish={onSubmit}
                layout="vertical"
            >
                <Form.Item<IBranchPatch> name="id" className="hidden" />
                <Form.Item<IBranchPatch>
                    name="name"
                    label={t("Название филиала")}
                    rules={[
                        {
                            required: true,
                            message: t('Пожалуйста, заполните поле!'),
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<IBranchPatch>
                    name="address"
                    label="Адрес"
                    rules={[
                        {
                            required: true,
                            message: t('Пожалуйста, заполните поле!'),
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="is_active" valuePropName="checked">
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

export { AdminUpdateBranchForm };
