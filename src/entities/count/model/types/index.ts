export interface ClientData {
    gender_count: {
        count: {
            Male: number;
            Female: number;
        };
    };
    client_type_count: {
        count: {
            new: number;
            old: number;
        };
    };
    client_age_count: {
        count: {
            [key: string]: number;
        };
    };
    hourly_client_counts: {
        counts: {
            [key: string]: number;
        };
    };
}

export interface IClientIntervalData extends ClientData {
    daily_client_counts: {
        start_date: string;
        end_date: string;
        counts: {
            [key: string]: number;
        };
    };
}

export interface IClientParams {
    branch_id: number | undefined;
    date: string;
}
export interface IClientIntervalParams {
    branch_id?: number;
    start_date?: string;
    end_date?: string;
}
export interface PeakAttendance {
    time: string;
    client_count: number;
}
