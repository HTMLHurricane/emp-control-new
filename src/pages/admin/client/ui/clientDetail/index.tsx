import { useGetTopClientByIdQuery } from '@/entities/client/api';
import { Button, Card, Image, Row, Col, Spin, List } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useNavigate, useParams } from 'react-router-dom';
import { ClientAttendances } from '../clientAttendance';

export const ClientDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useGetTopClientByIdQuery(id, {
        skip: id === undefined,
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (!data) {
        return <div>Данные не найдены</div>;
    }

    return (
        <div>
            <Card className="w-full">
                <Button onClick={() => navigate(-1)} type="primary">
                    Назад
                </Button>
                <Row gutter={[16, 16]} align="middle" justify="center">
                    <Col span={12}>
                        <Meta
                            description={
                                <div className="flex items-center bg-white shadow-md rounded-lg p-6">
                                    <div className="space-y-4 ml-8">
                                        <div className="text-lg">
                                            <span className="text-gray-700 font-semibold">
                                                Возраст:
                                            </span>
                                            <span className="ml-2 text-gray-900">
                                                {data.age}
                                            </span>
                                        </div>
                                        <div className="text-lg">
                                            <span className="text-gray-700 font-semibold">
                                                Пол:
                                            </span>
                                            <span className="ml-2 text-gray-900">
                                                {data.gender}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            }
                        />
                    </Col>

                    <Col span={12} style={{ textAlign: 'center' }}>
                        <div
                            style={{
                                height: '60vh',
                                overflowY: 'auto',
                                padding: '16px',
                                border: '1px solid #ddd',
                            }}
                            className="custom-scroll rounded-lg"
                        >
                            <List
                                grid={{ column: 4 }}
                                dataSource={data.images}
                                renderItem={(item) => (
                                    <List.Item key={item.id}>
                                        <div className="relative group flex flex-col justify-center items-center">
                                            <Image
                                                src={item.url}
                                                alt={`Employee ${item.person_id}`}
                                                width={100}
                                                height={100}
                                                className="rounded-full cursor-pointer"
                                                preview={{ mask: null }}
                                            />
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Col>
                </Row>
            </Card>
            <ClientAttendances />
        </div>
    );
};
