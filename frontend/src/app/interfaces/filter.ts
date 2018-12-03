export interface Filter {
    type: 'select' | 'range' | 'date';
    label: string;
    key: string;
    url?: string;
    dataKey?: string;
    optionKey?: string;
}
