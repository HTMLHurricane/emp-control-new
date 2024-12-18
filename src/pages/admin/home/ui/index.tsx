import { Doughnut } from './doughnut';
import { Header } from './header';
import { Last } from './last';
import { Line } from './line';

const AdminHomePage = () => (
    <>
        <div className="flex-col gap-10">
            <Header />
            <div className="flex flex-col xl:flex-row">
                <Doughnut />
                <Line />
            </div>
            <Last />
        </div>
    </>
);

export { AdminHomePage };
