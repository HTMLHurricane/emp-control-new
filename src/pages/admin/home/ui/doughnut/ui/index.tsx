import { Spin } from 'antd';
import { DoughnutChart } from './chart';
import { useAppSelector, Card } from '@/shared';
import { useGetBranchByIdQuery } from '@/entities/branch/api';

const Doughnut = () => {
    const { homeDate, attendanceBranch } = useAppSelector();
    const { data, isLoading } = useGetBranchByIdQuery(
        {
            date: homeDate.format('YYYY-MM-DD'),
            branch_id: attendanceBranch!,
        },
        { skip: attendanceBranch === undefined },
    );
    if (isLoading && !data) {
        return (
            <div className="w-full flex-1 flex items-center justify-center h-[450px]">
                <Spin />
            </div>
        );
    } else {
        return (
            <Card className="xl:max-w-[400px]">
                <DoughnutChart
                    datasets={[
                        data?.absent_employees ?? 0,
                        data?.late_employees ?? 0,
                        data?.present_employees ?? 0,
                    ]}
                    date={homeDate}
                    total={data?.total_employees ?? 0}
                />
            </Card>
        );
    }
};

export { Doughnut };
