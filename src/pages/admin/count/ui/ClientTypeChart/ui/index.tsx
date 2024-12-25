import { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const ClientType = ({ data }: { data: number[] | undefined }) => {
    const total = data ? data[0] + data[1] : 0;
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const updateLayout = () => {
            const isMobile = window.innerWidth < 768;
            setIsMobile(isMobile ? true : false); // Изменяем радиус
        };
        updateLayout(); // Установить начальное состояние
        window.addEventListener('resize', updateLayout);
        return () => window.removeEventListener('resize', updateLayout);
    }, []);

    const formattedData = [
        { name: 'Постоянные', value: data ? data[0] : 0 },
        { name: 'Новые', value: data ? data[1] : 0 },
    ];

    const COLORS = ['#2E3A8C', '#32CD32'];

    const renderLabel = ({ name, value }: { name: string; value: number }) => {
        const percent = total > 0 ? ((value / total) * 100).toFixed(0) : 0; // Защита от деления на 0
        return `${name} ${percent}%`;
    };

    return (
        <div className="w-[350px] h-[280px] md:w-[580px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={formattedData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label={isMobile ? undefined : renderLabel}
                    >
                        {formattedData.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]} // Применение ассоциированных цветов
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
