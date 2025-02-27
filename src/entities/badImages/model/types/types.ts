import { IPaginationParams } from '@/shared/types/Types';

export interface BadImagesData {
    id: number;
    image_key: string;
    organization_id: number;
    pose: string;
    created_at: string;
}

export interface BadImagesParams extends IPaginationParams {
    start_date?: string;
    end_date?: string;
}
