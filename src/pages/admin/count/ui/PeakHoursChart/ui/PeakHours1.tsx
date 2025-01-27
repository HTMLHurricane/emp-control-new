import { PeakAttendance } from '@/entities/count/model/types';
import { Title, Card } from '@/shared';
import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface CustomizedLabelProps {
    x?: number;
    y?: number;
    stroke?: string;
    value?: number;
}

export const CustomizedLabel: React.FC<CustomizedLabelProps> = ({
    x = 0,
    y = 0,
    stroke = '#000',
    value = 0,
}) => (
    <text x={x} y={y} dy={-4} fill={stroke} fontSize={14} textAnchor="middle">
        {value}
    </text>
);

interface CustomizedAxisTickProps {
    x?: number;
    y?: number;
    payload?: { value: string };
}

export const CustomizedAxisTick: React.FC<CustomizedAxisTickProps> = ({
    x = 0,
    y = 0,
    payload,
}) => (
    <g transform={`translate(${x},${y})`}>
        <text
            x={10}
            y={0}
            dy={16}
            textAnchor="end"
            fill="#666"
            transform="rotate(-35)"
        >
            {payload ? payload.value : ''}
        </text>
    </g>
);

interface PeakHoursProps {
    data: PeakAttendance[];
    day?: string;
    type?: 'days' | 'time';
}

export const PeakHours1: React.FC<PeakHoursProps> = ({
    data,
    type = 'time',
}) => {
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            // Получаем данные для подсказки
            const { time, client_count } = payload[0].payload; // Используем payload[0].payload для извлечения данных
            return (
                <div className="custom-tooltip text-[#8884d8] bg-white p-2 border-solid border-[1px] rounded-[5px]">
                    <p>
                        {type == 'days' ? 'День' : 'Время'} : {time}
                    </p>
                    <p>Количество клиентов: {client_count}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card
            title={
                <Title>
                    {type == 'days'
                        ? 'Количество клиентов'
                        : 'Пиковое время клиентов'}{' '}
                </Title>
            }
            style={{ height: 500 }}
            className="text-center my-5"
        >
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 10,
                    }}
                    
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="time" // Используем "time" для оси X
                        height={50}
                        tick={<CustomizedAxisTick />}
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="monotone"
                        dataKey="client_count" // Используем "client_count" для отображения данных
                        stroke="#8884d8"
                        label={<CustomizedLabel />}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Card>
    );
};
