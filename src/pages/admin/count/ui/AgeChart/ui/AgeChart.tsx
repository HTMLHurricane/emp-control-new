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
            x={0}
            y={0}
            dy={16}
            textAnchor="end"
            fill="#666"
            transform="rotate(-35)"
        >
            {payload ? `${payload.value} лет` : ''} {/* Добавляем "лет" */}
        </text>
    </g>
);

interface AgeChartProps {
    data: { [key: string]: number } | []; // Тип для ageStatistics
    day: string; // День для отображения в заголовке
}

export const AgeChartExample: React.FC<AgeChartProps> = ({ data, day }) => {
    // Преобразуем объект с использованием Object.values и Object.keys
    const transformedData = Object.keys(data).map((ageGroup, index) => ({
        ageGroup, // Возрастная группа (например "18-24")
        client_count: Object.values(data)[index], // Количество клиентов
    }));

    // Кастомная функция для отображения подсказки
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const { ageGroup, client_count } = payload[0].payload;
            return (
                <div className="custom-tooltip text-[#380848] bg-white p-2 border-solid border-[1px] rounded-[5px]">
                    <p>{`${ageGroup} лет`}</p>
                    <p>{`Количество клиентов: ${client_count}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card
            title={<Title>Возраст клиентов, статистика за {day}</Title>}
            style={{ height: 500 }}
            className="text-center my-5"
        >
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={transformedData} // Передаем преобразованные данные
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 10,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="ageGroup" // Используем возрастные группы как ключ для оси X
                        height={50}
                        tick={<CustomizedAxisTick />} // Используем кастомные метки с "лет"
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />{' '}
                    {/* Кастомная подсказка */}
                    <Line
                        type="monotone"
                        dataKey="client_count" // Используем "client_count" для отображения данных
                        stroke="#380848"
                        label={<CustomizedLabel />}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Card>
    );
};
