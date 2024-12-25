import { useLoginMutation } from '@/entities/auth/api';
import { IAuthForm } from '@/entities/auth/model/types/index.types';
import { TOKEN } from '@/shared';
import type { FormProps } from 'antd';
import { Button, Form, Input, message } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [login, { data, isError, isSuccess, isLoading }] = useLoginMutation();

    const onFinish: FormProps<IAuthForm>['onFinish'] = (values) => {
        if (values) {
            login(values);
        }
    };

    const onFinishFailed: FormProps<IAuthForm>['onFinishFailed'] = (
        errorInfo,
    ) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        const token = TOKEN.get();
        if (token) {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        if (isError) {
            message.error('Вы ввели неправильную почту или пароль');
            form.resetFields(['username', 'password']);
        }
        if (isSuccess) {
            message.success('Добро пожаловать!');
            TOKEN.set(data?.access_token);
            navigate('/');
        }
    }, [isError, isSuccess]);

    return (
        <div className="w-[400px]">
            <h1 className="text-center mb-5">Авторизация</h1>
            <Form
                name="basic"
                onFinish={onFinish}
                form={form}
                style={{ width: 400 }}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item<IAuthForm>
                    label="Логин"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста введите вашу почту!',
                        },
                    ]}
                >
                    <Input type="text" />
                </Form.Item>

                <Form.Item<IAuthForm>
                    label="Пароль"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста введите ваш пароль!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button
                        loading={isLoading}
                        block
                        type="primary"
                        htmlType="submit"
                    >
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export { AuthForm };
