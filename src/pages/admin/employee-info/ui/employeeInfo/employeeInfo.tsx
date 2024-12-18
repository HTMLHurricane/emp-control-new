import { Card, Row, Col, Image, Spin } from 'antd';
import { EmployeeImageGallery } from '../employeeImageGallery/employeeImageGallery';
import { useParams } from 'react-router-dom';
import { useGetEmployeeByIdQuery } from '@/entities/employee-info/api';

const { Meta } = Card;

export const EmployeeInfo = () => {
    const { id } = useParams();
    const { data } = useGetEmployeeByIdQuery(id, { skip: id === undefined });

    if (!data) {
        return <Spin />;
    }
    return (
        <Card className="w-full">
            <Row gutter={[16, 16]} align="middle" justify="center">
                <Col span={12}>
                    <Meta
                        description={
                            <div className="flex items-center bg-white shadow-md rounded-lg p-6">
                                <Image
                                    src={data?.first_image?.url}
                                    width={350}
                                    alt="Employee Image"
                                    className="rounded-full cursor-pointer"
                                    preview={{ mask: null }}
                                />
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
