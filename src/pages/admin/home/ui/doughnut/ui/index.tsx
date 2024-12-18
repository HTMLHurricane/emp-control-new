import { Spin } from 'antd';
import { DoughnutChart } from './chart';
import { useAppSelector, Card } from '@/shared';
import { useGetBranchesInfoQuery } from '@/entities/branch/api';

const Doughnut = () => {
    const { homeDate, attendanceBranch } = useAppSelector();
    const { data, isLoading } = useGetBranchesInfoQuery(
        homeDate.format('YYYY-MM-DD'),
    );
    const selectedBranch = data?.find(
        (branch) => branch.id === attendanceBranch,
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
                        selectedBranch?.absent_employees ?? 0,
                        selectedBranch?.late_employees ?? 0,
                        selectedBranch?.total_employees ?? 0,
                    ]}
                    date={homeDate}
                    total={selectedBranch?.total_employees ?? 0}
                />
            </Card>
        );
    }
};

export { Doughnut };
