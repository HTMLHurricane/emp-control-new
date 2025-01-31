import { useGetAllBranchesQuery } from '@/entities/branch/api';
import {
    useCreateEmployeeMutation,
    useSetEmployeeImageMutation,
} from '@/entities/employee/api';
import { IEmployeePost } from '@/entities/employee/model/types';
import { useGetAllRolesQuery } from '@/entities/role/api';
import { useGetAllSchedulesQuery } from '@/entities/schedule/api';
import { TOKEN, useAppActions } from '@/shared';
import { mapToOptions } from '@/shared/lib/mapToOptions';
import { Button, Col, Form, Input, Row, Select, Upload, message } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { FormLayout } from '@/shared/ui/formLayout/formLayout';
import { useCheckUserQuery } from '@/entities/auth/api';

const AdminCreateEmployeeForm = () => {
    const [form] = Form.useForm();
    const [createEmployee, { isSuccess, isError }] =
        useCreateEmployeeMutation();
    const { data: roles } = useGetAllRolesQuery();
    const { data: branches } = useGetAllBranchesQuery();
    const { data: schedules } = useGetAllSchedulesQuery();
    const { setIsCreatingEmployee } = useAppActions();
    const [
        setImage,
        { isLoading: loading, isSuccess: success, isError: error },
    ] = useSetEmployeeImageMutation();
    const token = TOKEN.get();
    const { data: getmeData } = useCheckUserQuery(token as string);
    const roleOptions = useMemo(() => mapToOptions(roles), [roles]);
    const branchOptions = useMemo(() => mapToOptions(branches), [branches]);
    const scheduleOptions = useMemo(() => mapToOptions(schedules), [schedules]);

    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleUploadChange = (info: any) => {
        if (info.fileList.length > 0) {
            const selectedFile = info.fileList[0].originFileObj;
            setImageFile(selectedFile);
        }
    };

    const onSubmit = async (data: Omit<IEmployeePost, 'organization_id'>) => {
        const employeeResponse = await createEmployee({
            organization_id: getmeData!.org,
            ...data,
        }).unwrap();
        if (imageFile) {
            await setImage({
                id: employeeResponse.data.id,
                file: imageFile,
            });
        }
    };

    useEffect(() => {
        if (isSuccess && success) {
            message.success('Сотрудник успешно создан!');
            setIsCreatingEmployee(false);
        } else if (loading) {
            message.loading('Создаем сотрудника...');
        } else if (isError || error) {
            message.error('Произошла ошибка при создании сотрудника.');
        }
    }, [isSuccess, isError, success, loading, error]);

    const onCancel = () => {
        setIsCreatingEmployee(false);
        form.resetFields();
    };

    useEffect(() => () => onCancel(), []);

    return (
        <FormLayout title="Добавить сотрудника" size="xl">
            <Form
                form={form}
                onFinish={onSubmit}
                layout="vertical"
                className="space-y-4"
            >
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="first_name"
                            label="Имя"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, заполните поле!',
                                },
                            ]}
                        >
                            <Input placeholder="Введите имя" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="position_id"
                            label="Должность"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, выберите должность!',
                                },
                            ]}
                        >
                            <Select
                                disabled={!roleOptions?.length}
                                options={roleOptions}
                                placeholder="Выберите должность"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="last_name"
                            label="Фамилия"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, заполните поле!',
                                },
                            ]}
                        >
                            <Input placeholder="Введите фамилию" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="branch_id"
                            label="Филиал"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, выберите филиал!',
                                },
                            ]}
                        >
                            <Select
                                disabled={!branchOptions?.length}
                                options={branchOptions}
                                placeholder="Выберите филиал"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="phone"
                            label="Телефон"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Пожалуйста, введите номер телефона!',
                                },
                            ]}
                        >
                            <Input placeholder="Введите номер телефона" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="schedule_id"
                            label="Рабочий график"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, выберите график!',
                                },
                            ]}
                        >
                            <Select
                                disabled={!scheduleOptions?.length}
                                options={scheduleOptions}
                                placeholder="Выберите график"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="Выберите изображение"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Пожалуйста, выберите изображение!',
                                },
                            ]}
                        >
                            <Upload
                                beforeUpload={() => false}
                                maxCount={1}
                                accept="image/*"
                                onChange={handleUploadChange}
                            >
                                <Button icon={<UploadOutlined />}>
                                    Выбрать изображение
                                </Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
                <div className="flex justify-end space-x-4">
                    <Button onClick={onCancel} type="default">
                        Отмена
                    </Button>
                    <Button loading={loading} type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </div>
            </Form>
        </FormLayout>
    );
};

export { AdminCreateEmployeeForm };
