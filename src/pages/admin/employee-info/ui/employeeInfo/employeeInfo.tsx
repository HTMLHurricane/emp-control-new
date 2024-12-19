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
} from 'antd';
import { EmployeeImageGallery } from '../employeeImageGallery/employeeImageGallery';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetEmployeeByIdQuery } from '@/entities/employee-info/api';
import { MdDelete } from 'react-icons/md';
import { useDeleteEmployeeMutation } from '@/entities/employee/api';
import { IEmployee } from '@/entities/employee/model/types';
import { useAppActions } from '@/shared';
import { useEffect } from 'react';
import { BsPencil } from 'react-icons/bs';

const { Meta } = Card;

export const EmployeeInfo = () => {
    const { id } = useParams();
    const [deleteEmployee, { isSuccess: deleteSuccess }] =
        useDeleteEmployeeMutation();
    const { setEmployeeForm, setIsUpdatingEmployee } = useAppActions();
    const navigate = useNavigate();
    const { data, isLoading } = useGetEmployeeByIdQuery(id, {
        skip: id === undefined,
    });
    useEffect(() => {
        if (deleteSuccess) {
            message.success('Успешно удалено');
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
                <Empty description="Данные Сотрудника не найдены" />
            </div>
        );
    }
    return (
        <Card className="w-full">
            <Row gutter={[16, 16]} align="middle" justify="center">
                <Col span={12}>
                    <Meta
                        description={
                            <div className="flex items-center bg-white shadow-md rounded-lg p-6">
                                <div className="relative group flex flex-col justify-center items-center">
                                    <Image
                                        src={data?.first_image?.url}
                                        alt={`Employee`}
                                        width={300}
                                        height={300}
                                        className="cursor-pointer rounded-full"
                                        preview={{ mask: null }}
                                    />
                                    <div className="flex items-center w-[300px] h-[150px] rounded-b-full absolute bottom-0 cursor-pointer bg-[#80808080] text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                        <Popconfirm
                                            onConfirm={() =>
                                                deleteEmployee(data.id)
                                            }
                                            className="basis-1/2 flex justify-center pl-10"
                                            title="Вы действительно хотите удалить сотрудника?"
                                        >
                                            <MdDelete size={40} />
                                        </Popconfirm>
                                        <div className="basis-1/2 flex justify-center pr-8">
                                            <Button
                                                className="text-[12px] md:text-[20px]"
                                                onClick={() => handleEdit(data)}
                                                type="link"
                                                icon={<BsPencil size={30} />}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 ml-8">
                                    <div className="text-lg">
                                        <span className="text-gray-700 font-semibold">
                                            ФИО:
                                        </span>
                                        <span className="ml-2 text-gray-900">
                                            {data.full_name}
                                        </span>
                                    </div>
                                    <div className="text-lg">
                                        <span className="text-gray-700 font-semibold">
                                            Телефон:
                                        </span>
                                        <span className="ml-2 text-gray-900">
                                            {data.phone}
                                        </span>
                                    </div>
                                    <div className="text-lg">
                                        <span className="text-gray-700 font-semibold">
                                            Филиал:
                                        </span>
                                        <span className="ml-2 text-gray-900">
                                            {data.branch.name}
                                        </span>
                                    </div>
                                    <div className="text-lg">
                                        <span className="text-gray-700 font-semibold">
                                            Должность:
                                        </span>
                                        <span className="ml-2 text-gray-900">
                                            {data.position.name}
                                        </span>
                                    </div>
                                    <div className="text-lg">
                                        <span className="text-gray-700 font-semibold">
                                            Рабочий график:
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
