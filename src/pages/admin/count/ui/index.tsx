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
import { useAppSelector } from '@/shared';
import dayjs from 'dayjs';
import { useState } from 'react';

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
    const [dates, setDates] = useState<
        [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
    >(null);
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
                        <PeakHours
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
                    <PeakHours
                        day={
                            dates
                                ? `${dates?.[0]?.format(
                                      'YYYY-MM-DD',
                                  )} - ${dates?.[1]?.format('YYYY-MM-DD')}`
                                : date
                        }
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
                                      counts: data.hourly_client_counts.counts,
                                  })
                                : []
                        }
                    />
                    <AgeChartExample
                        day={
                            dates
                                ? `${dates?.[0]?.format(
                                      'YYYY-MM-DD',
                                  )} - ${dates?.[1]?.format('YYYY-MM-DD')} `
                                : date
                        }
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
