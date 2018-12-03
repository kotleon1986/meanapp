export interface DataTableParams {
    page: number;
    size: number;
    order: string;
    dir: 'asc' | 'desc';
    search?: string;
    export?: number;
}
