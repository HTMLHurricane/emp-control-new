import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const Sex = ({ count }: { count: [number, number] }) => {
    const {t} = useTranslation()
    const total = count[0] + count[1]; // Общее количество людей
    const formattedData = [
        {
            name: t('Мужчины'),
            value: count[0],
            percent: total > 0 ? (count[0] / total) * 100 : 0,
        },
        {
            name: t('Женщины'),
            value: count[1],
            percent: total > 0 ? (count[1] / total) * 100 : 0,
        },
    ];

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const updateLayout = () => {
            const isMobile = window.innerWidth < 768;
            setIsMobile(isMobile); // Изменяем радиус
        };
        updateLayout(); // Установить начальное состояние
        window.addEventListener('resize', updateLayout);
        return () => window.removeEventListener('resize', updateLayout);
    }, []);

    // Новые ассоциированные цвета для каждого сегмента
    const COLORS = ['#1E90FF', '#FF5252 ']; // Темно-синий для мужчин и красный для женщин

    const renderLabel = ({
        name,
        percent,
    }: {
        name: string;
        percent: number;
    }) => {
        return `${name} ${percent.toFixed(2)}%`; // Показать процент с 2 знаками после запятой
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
                                fill={COLORS[index % COLORS.length]} // Применение новых цветов
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
