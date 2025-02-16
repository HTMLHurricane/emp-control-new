import { SexChart } from './pie/ui';
import { ClientTypeChart } from './ClientTypeChart';
import { PeakHours } from './PeakHoursChart/ui/PeakHours';
import { AgeChartExample } from './AgeChart/ui/AgeChart';
import { Header } from './header/ui';
import {
    useGetClientsByIntervalQuery,
    useGetClientsStatisticQuery,
} from '@/entities/count/api';
import { Spin } from 'antd';
import { ClientData, IClientIntervalData } from '@/entities/count/model/types';
import { TOKEN, useAppActions, useAppSelector } from '@/shared';
import { PeakHours1 } from './PeakHoursChart/ui/PeakHours1';
import { useCheckUserQuery } from '@/entities/auth/api';
import { useTranslation } from 'react-i18next'

const transformIntervalData = (
    hourlyClientCounts: IClientIntervalData['daily_client_counts'],
) => {
    return Object.entries(hourlyClientCounts.counts).map(
        ([time, client_count]) => ({
            time,
            client_count,
        }),
    );
};

const transformData = (
    hourlyClientCounts: ClientData['hourly_client_counts'],
) => {
    return Object.entries(hourlyClientCounts.counts).map(
        ([time, client_count]) => ({
            time,
            client_count,
        }),
    );
};

const AdminCount = () => {
    const {t} = useTranslation()
    const { dates } = useAppSelector();
    const { setDates } = useAppActions();
    const { data: admin } = useCheckUserQuery(TOKEN.get() as string);
    const { attendanceBranch, homeDate } = useAppSelector();
    const date = homeDate.format('YYYY-MM-DD');

    const { data, isLoading } = useGetClientsStatisticQuery(
        {
            branch_id: attendanceBranch,
            date,
        },
        { skip: attendanceBranch === undefined },
    );
    const { data: intervalData } = useGetClientsByIntervalQuery(
        {
            branch_id: attendanceBranch,
            start_date: dates ? dates?.[0]?.format('YYYY-MM-DD') : date,
            end_date: dates ? dates?.[1]?.format('YYYY-MM-DD') : date,
        },
        { skip: attendanceBranch === undefined },
    );

    if (isLoading) {
        return <Spin />;
    }

    return (
        <div className="w-full">
            <Header dates={dates} setDates={setDates} />
            <div className="text-xl font-bold text-center pt-5 pb-1">
                {t("Статистика за")}{' '}
                {dates
                    ? `${
                          dates?.[0]?.format('YYYY-MM-DD') +
                          ' - ' +
                          dates?.[1]?.format('YYYY-MM-DD')
                      }`
                    : date}
            </div>
            <div className="flex flex-col xl:flex-row">
                <SexChart
                    count={
                        dates
                            ? [
                                  intervalData
                                      ? intervalData.gender_count.count.Male
                                      : 0,
                                  intervalData
                                      ? intervalData.gender_count.count.Female
                                      : 0,
                              ]
                            : [
                                  data ? data.gender_count.count.Male : 0,
                                  data ? data.gender_count.count.Female : 0,
                              ]
                    }
                />
                <ClientTypeChart
                    data={
                        dates
                            ? [
                                  intervalData
                                      ? intervalData.client_type_count.count.old
                                      : 0,
                                  intervalData
                                      ? intervalData.client_type_count.count.new
                                      : 0,
                              ]
                            : [
                                  data ? data.client_type_count.count.old : 0,
                                  data ? data.client_type_count.count.new : 0,
                              ]
                    }
                />
            </div>
            <div className="flex justify-between">
                <div className="flex-col w-full">
                    {dates && (
                        <PeakHours1
                            day={`${dates?.[0]?.format(
                                'YYYY-MM-DD',
                            )} - ${dates?.[1]?.format('YYYY-MM-DD')}`}
                            data={
                                intervalData
                                    ? transformIntervalData(
                                          intervalData.daily_client_counts,
                                      )
                                    : []
                            }
                            type="days"
                        />
                    )}
                    {admin?.is_admin ? (
                        <PeakHours
                            data={
                                dates
                                    ? intervalData
                                        ? transformData({
                                              counts: intervalData
                                                  .hourly_client_counts.counts,
                                          })
                                        : []
                                    : data
                                    ? transformData({
                                          counts: data.hourly_client_counts
                                              .counts,
                                      })
                                    : []
                            }
                        />
                    ) : (
                        <PeakHours1
                            data={
                                dates
                                    ? intervalData
                                        ? transformData({
                                              counts: intervalData
                                                  .hourly_client_counts.counts,
                                          })
                                        : []
                                    : data
                                    ? transformData({
                                          counts: data.hourly_client_counts
                                              .counts,
                                      })
                                    : []
                            }
                        />
                    )}
                    <AgeChartExample
                        data={
                            dates
                                ? intervalData
                                    ? intervalData?.client_age_count.count
                                    : []
                                : data
                                ? data.client_age_count.count
                                : []
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export { AdminCount };
