export interface IdName {
    id: number;
    name: string;
}

export interface IResponse {
    message: string;
    detail: string;
}

export interface IAttendanceStats {
    total_employees: number;
    present_employees: number;
    late_employees: number;
    absent_employees: number;
}

export interface IData<T> {
    page: number;
    page_size: number;
    total_elements: number;
    total_pages: number;
    content: T
}

export interface IPaginationParams {
    page: number;
    page_size: number;
}
