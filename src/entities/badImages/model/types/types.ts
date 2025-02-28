import { IPaginationParams } from '@/shared/types/Types';

export interface BadImagesData {
    id: number;
    image_key: string;
    organization_id: number;
    pose: string;
    created_at: string;
}

export interface BadImagesParams extends IPaginationParams {
    start_date: string;
    end_date: string;
}

export interface BadImagesByInterval {
    page: number;
    page_size: number;
    total_elements: number;
    total_pages: number;
    content: BadImagesData[];
}
