import { useUpdateEmployeeMutation } from '@/entities/employee/api';
import { IEmployeePatch } from '@/entities/employee/model/types';
import { useAppActions, useAppSelector } from '@/shared';
import { Button, Col, Form, Input, message, Row, Select } from 'antd';
import { useEffect, useMemo } from 'react';
import { useGetAllBranchesQuery } from '@/entities/branch/api';
import { useGetAllRolesQuery } from '@/entities/role/api';
import { useGetAllSchedulesQuery } from '@/entities/schedule/api';
import { mapToOptions } from '@/shared/lib/mapToOptions';
import { FormLayout } from '@/shared/ui/formLayout/formLayout';
import { useNavigate } from 'react-router-dom';

const AdminUpdateEmployeeForm = () => {
    const [form] = Form.useForm();
    const [updateEmployee, { isSuccess, isLoading, isError }] =
        useUpdateEmployeeMutation();
    const { data: schedules } = useGetAllSchedulesQuery();
    const { employeeForm } = useAppSelector();
    const { setIsUpdatingEmployee } = useAppActions();
    const { data: roles } = useGetAllRolesQuery();
    const { data: branches } = useGetAllBranchesQuery();
    const navigate = useNavigate();
    const roleOptions = useMemo(() => mapToOptions(roles), [roles]);
    const branchOptions = useMemo(() => mapToOptions(branches), [branches]);
    const scheduleOptions = useMemo(() => mapToOptions(schedules), [schedules]);

    const onSubmit = (data: IEmployeePatch) => {
        updateEmployee({
            id: employeeForm?.id,
            ...data,
        });
    };

    const onCancel = () => {
        setIsUpdatingEmployee(false);
        form.resetFields();
        navigate(`/employees/${employeeForm?.id}`);
    };

    useEffect(() => {
        if (employeeForm) {
            form.setFieldsValue({
                ...employeeForm,
                schedule: employeeForm.schedule_id,
            });
        }
    }, [employeeForm, form]);

    useEffect(() => {
        if (isSuccess) {
            message.success('Сотрудник успешно изменён');
            setIsUpdatingEmployee(false);
        }
        if (isError) {
            message.error('Произошла ошибка во время редактирования');
            console.log('error', isError);
        }
    }, [isSuccess, isError, setIsUpdatingEmployee]);

    useEffect(() => {
        return () => {
            onCancel();
        };
    }, []);

    return (
        <FormLayout title="Изменить данные сотрудника">
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

export { AdminUpdateEmployeeForm };
