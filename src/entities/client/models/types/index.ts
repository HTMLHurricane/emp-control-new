export interface ITopClients {
    client_id: number;
    visit_count: number;
    first_photo: string;
}

export interface ITopClientDetail {
    age: number;
    gender: string;
    id: number;
    organization_id: number;
    created_at: string;
    images: {
        url: string;
        pose: string;
        det_score: number;
        person_type: string;
        person_id: number;
        id: number;
    }[];
}

export interface IClientAttendance {
    client_id: number;
    device_id: number;
    url: string;
    age: number;
    gender: string;
    pose: [number, number, number]; // Координаты
    score: number;
    date: string; // Дата в формате ISO
    organization_id: number;
    id: number;
}

export interface ITopClientsParams {
    start_date: string;
    end_date: string;
    top_count: number;
}

export interface IAttendanceClientParams {
    client_id: string | undefined;
    page: number;
    page_size: number;
}
