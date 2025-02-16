import {
    Card,
    Row,
    Col,
    Image,
    Spin,
    Empty,
    Popconfirm,
    message,
    Button,
    Upload,
} from 'antd';
import { EmployeeImageGallery } from '../employeeImageGallery/employeeImageGallery';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetEmployeeByIdQuery } from '@/entities/employee-info/api';
import { UploadOutlined } from '@ant-design/icons';
import {
    useDeleteEmployeeMutation,
    useSetEmployeeImageMutation,
} from '@/entities/employee/api';
import { IEmployee } from '@/entities/employee/model/types';
import { useAppActions } from '@/shared';
import { useEffect, useState } from 'react';
import { FaInfo } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const { Meta } = Card;

export const EmployeeInfo = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const [deleteEmployee, { isSuccess: deleteSuccess }] =
        useDeleteEmployeeMutation();
    const { setEmployeeForm, setIsUpdatingEmployee } = useAppActions();
    const navigate = useNavigate();
    const [setImage, { isSuccess: addImageSuccess }] =
        useSetEmployeeImageMutation();
    const { data, isLoading } = useGetEmployeeByIdQuery(id, {
        skip: id === undefined,
    });
    const [fileList, setFileList] = useState<any[]>([]);

    const handleUploadChange = (info: any) => {
        if (info.fileList.length > 0) {
            const selectedFile = info.fileList[0].originFileObj;
            setImage({
                id: id!,
                file: selectedFile,
            });
            setFileList(info.fileList);
        }
    };

    useEffect(() => {
        if (addImageSuccess) {
            message.success(t('Успешно загружено'));
            setFileList([]);
        }
    }, [addImageSuccess]);

    useEffect(() => {
        if (deleteSuccess) {
            message.success(t('Успешно удалено'));
            navigate('/employees');
        }
    }, [deleteSuccess]);

    const handleEdit = (rec: IEmployee) => {
        setEmployeeForm({
            id: rec.id,
            first_name: rec.first_name,
            last_name: rec.last_name,
            phone: rec.phone,
            branch_id: rec.branch.id,
            position_id: rec.position.id,
            schedule_id: rec.schedule.id,
        });
        setIsUpdatingEmployee(true);
        navigate('/employees');
    };

    if (isLoading) {
        return <Spin />;
    }
    if (!data) {
        return (
            <div className="flex justify-center items-center ">
                <Empty description={t('Данные Сотрудника не найдены')} />
            </div>
        );
    }
    return (
        <Card className="w-full py-16">
            <Row gutter={[16, 16]} align="middle" justify="center">
                <Col span={12}>
                    <Meta
                        description={
                            <div className="flex items-center bg-white shadow-md rounded-lg p-6">
                                <div className="relative group flex flex-col justify-center items-center">
                                    {data.first_image ? (
                                        <Image
                                            src={data.first_image.url}
                                            alt={`Employee`}
                                            width={300}
                                            height={300}
                                            className="cursor-pointer rounded-full"
                                            preview={{ mask: null }}
                                        />
                                    ) : (
                                        <>{t('Фото отсутствует')}</>
                                    )}
                                    {data.first_image ? (
                                        <div className="flex items-center w-[300px] h-[150px] rounded-b-full absolute bottom-0 cursor-pointer bg-white text-red-500 opacity-80 group-hover:opacity-80 transition-opacity duration-300 ease-in-out">
                                            <Popconfirm
                                                onConfirm={() =>
                                                    deleteEmployee(data.id)
                                                }
                                                className="basis-1/2 flex justify-center pl-10 text-4xl font-bold"
                                                title={t(
                                                    'Вы действительно хотите удалить сотрудника?',
                                                )}
                                            >
                                                x
                                            </Popconfirm>
                                            <Upload
                                                beforeUpload={() => false}
                                                maxCount={1}
                                                accept="image/*"
                                                onChange={handleUploadChange}
                                                fileList={fileList}
                                                onRemove={() => setFileList([])}
                                            >
                                                <Button
                                                    icon={<UploadOutlined />}
                                                >
                                                    {'Фото'}
                                                </Button>
                                            </Upload>
                                            <div className="basis-1/2 flex justify-center pr-8">
                                                <Button
                                                    className="text-[12px] md:text-[20px]"
                                                    onClick={() =>
                                                        handleEdit(data)
                                                    }
                                                    type="link"
                                                    icon={<FaInfo size={25} />}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center pt-5 justify-between w-[120px] pb-5">
                                                <Popconfirm
                                                    onConfirm={() =>
                                                        deleteEmployee(data.id)
                                                    }
                                                    className="basis-1/2 flex justify-center pl-10 text-4xl font-bold text-red-500"
                                                    title={t(
                                                        'Вы действительно хотите удалить сотрудника?',
                                                    )}
                                                >
                                                    x
                                                </Popconfirm>
                                                <div className="flex justify-center">
                                                    <Button
                                                        className="text-[12px] md:text-[20px]"
                                                        onClick={() =>
                                                            handleEdit(data)
                                                        }
                                                        type="link"
                                                        icon={
                                                            <FaInfo size={25} />
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <Upload
                                                beforeUpload={() => false}
                                                maxCount={1}
                                                accept="image/*"
                                                onChange={handleUploadChange}
                                            >
                                                <Button
                                                    icon={<UploadOutlined />}
                                                >
                                                    {t('Фото')}
                                                </Button>
                                            </Upload>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4 ml-8">
                                    <div className="text-lg">
                                        <span className="text-gray-700 font-semibold">
                                            {t('ФИО')}:
                                        </span>
                                        <span className="ml-2 text-gray-900">
                                            {data.full_name}
                                        </span>
                                    </div>
                                    <div className="text-lg">
                                        <span className="text-gray-700 font-semibold">
                                            {t('Телефон')}:
                                        </span>
                                        <span className="ml-2 text-gray-900">
                                            {data.phone}
                                        </span>
                                    </div>
                                    <div className="text-lg">
                                        <span className="text-gray-700 font-semibold">
                                            {t('Филиал')}:
                                        </span>
                                        <span className="ml-2 text-gray-900">
                                            {data.branch.name}
                                        </span>
                                    </div>
                                    <div className="text-lg">
                                        <span className="text-gray-700 font-semibold">
                                            {t('Должность')}:
                                        </span>
                                        <span className="ml-2 text-gray-900">
                                            {data.position.name}
                                        </span>
                                    </div>
                                    <div className="text-lg">
                                        <span className="text-gray-700 font-semibold">
                                            {t('Рабочий график')}:
                                        </span>
                                        <span className="ml-2 text-gray-900">
                                            {data.schedule.name}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        }
                    />
                </Col>

                <Col span={12} style={{ textAlign: 'center' }}>
                    <EmployeeImageGallery />
                </Col>
            </Row>
        </Card>
    );
};
