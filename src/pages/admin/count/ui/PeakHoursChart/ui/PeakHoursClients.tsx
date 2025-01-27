import {
    useGetPeakHoursClientsQuery,
    useGetRegularClientsQuery,
} from '@/entities/count/api';
import { useAppSelector } from '@/shared';
import { Image } from 'antd/lib';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

export const PeakHoursClients = () => {
    const { dates, datesTimes } = useAppSelector();
    const { data } = useGetPeakHoursClientsQuery({
        start_time_str: `${dates?.[0]?.format(
            'YYYY-MM-DD',
        )} ${datesTimes?.slice(0, 5)}:00`,
        end_time_str: `${dates?.[1]?.format('YYYY-MM-DD')} ${datesTimes?.slice(
            6,
            11,
        )}:00`,
    });
    const { data: typeClients } = useGetRegularClientsQuery({
        start_time_str: `${dates?.[0]?.format('YYYY-MM-DD')}`,
        end_time_str: `${dates?.[1]?.format('YYYY-MM-DD')}`,
    });
    const navigate = useNavigate();

    return (
        <div>
            <h2 className="flex items-center text-lg font-semibold">
                <FaArrowLeft
                    size={18}
                    className="mr-3 cursor-pointer hover:text-blue-500 transition-colors duration-150"
                    onClick={() => navigate(-1)}
                />
                Клиенты за {dates?.[0]?.format('YYYY-MM-DD')} -{' '}
                {dates?.[1]?.format('YYYY-MM-DD')}
            </h2>
            <div className="text-xl font-semibold text-center my-5">
                Пиковое время клиентов
            </div>
            <div className="grid grid-cols-7 gap-10 pt-5">
                {data?.map((item) => (
                    <div key={item.client_id}>
                        <Image
                            src={item.first_photo}
                            width={100}
                            height={100}
                            className="rounded-lg"
                        />
                    </div>
                ))}
            </div>
            <div className="text-xl font-semibold text-center my-5">
                Постоянные клиенты
            </div>
            <div className="grid grid-cols-7 gap-10 pt-5">
                {typeClients?.map((item) => (
                    <div key={item.client_id}>
                        <Image
                            src={item.first_photo}
                            width={100}
                            height={100}
                            className="rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
