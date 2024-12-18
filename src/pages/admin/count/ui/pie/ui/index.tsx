import { Sex } from './chart/sex';
import { memo } from 'react';
import { Title, Card } from '@/shared';

export const SexChart = memo(
    ({ count, data }: { count: [number, number]; data: [number, number] }) => {
        return (
            <Card
                className="xl:w-1/3 text-center "
                title={<Title>По полу</Title>}
            >
                <div className="flex flex-col justify-center items-center">
                    <Sex count={count} data={data} />
                    <div className="flex items-center space-x-4 justify-center pt-5">
                        <span className="flex items-center space-x-2">
                            <span className="w-[20px] h-[20px] rounded-full bg-[#1E90FF]" />
                            <span>{count[0]} - мужчины</span>
                        </span>
                        <span className="flex items-center space-x-2">
                            <span className="w-[20px] h-[20px] rounded-full bg-[#FF5252]" />
                            <span>{count[1]} - женщины</span>
                        </span>
                    </div>
                </div>
            </Card>
        );
    },
);
