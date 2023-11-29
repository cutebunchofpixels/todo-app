export interface TodoFiltersDto {
    text?: string;
    done?: boolean;
    take?: number;
    skip?: number;
    orderBy?: string;
    orderDirection?: string;
}

