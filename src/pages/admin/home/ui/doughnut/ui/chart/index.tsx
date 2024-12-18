import { FC, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { IDoughnutChartProps } from '../../model';
import { useAppActions } from '@/shared';

ChartJS.register(ArcElement, Tooltip, Legend);
const cardClasses =
    'flex flex-1 lg:py-3.5 max-lg:py-2 flex-col lg:gap-5 max-lg:gap-3 border-solid border-x-0 border-b-0 text-center max-lg:w-full cursor-pointer';
const cardTextClasses = 'text-gray-400 lg:text-base max-lg:text-sm';

const DoughnutChart: FC<IDoughnutChartProps> = ({ datasets, date, total }) => {
    const { setIsNotComeModal, setIsLateModal, setIsComeModal } =
        useAppActions();
    const chartRef = useRef();
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `Статистика за ${date.format('YYYY-MM-DD')}`,
                font: {
                    size: 16,
                },
            },
        },
    };

    const data = {
        datasets: [
            {
                label: 'Количество',
                data: datasets,
                backgroundColor: ['red', 'yellow', 'green'],
                borderColor: ['red', 'yellow', 'green'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="gap-8 flex relative items-center flex-col justify-between w-full">
            <Doughnut
                ref={chartRef}
                data={data}
                options={options}
                style={{ width: '100%', maxHeight: '275px' }}
            />
            <span className="absolute top-32 text-green-600 text-xl font-bold">
                {(() => {
                    const value = datasets[2];
                    if (
                        typeof value !== 'number' ||
                        typeof total !== 'number' ||
                        total === 0
                    ) {
                        return '0';
                    }
                    const percentage = ((value / total) * 100).toFixed(2);
                    return Number.isNaN(Number(percentage)) ? '0' : percentage;
                })()}
                %
            </span>
            <div className="flex items-center justify-center w-full max-lg:flex-col">
                <div
                    onClick={() => setIsComeModal(true)}
                    className={`${cardClasses} border-t-green-500`}
                >
                    <span>{datasets[2]}</span>
                    <span className={cardTextClasses}>Пришли</span>
                </div>
                <div
                    onClick={() => setIsLateModal(true)}
                    className={`${cardClasses} border-t-yellow-200`}
                >
                    <span>{datasets[1]}</span>
                    <span className={cardTextClasses}>Опоздали</span>
                </div>
                <div
                    onClick={() => setIsNotComeModal(true)}
                    className={`${cardClasses} border-t-red-500`}
                >
                    <span>{datasets[0]}</span>
                    <span className={cardTextClasses}>Не пришли</span>
                </div>
            </div>
        </div>
    );
};

export { DoughnutChart };
