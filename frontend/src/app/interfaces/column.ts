import { CellType } from '../constants/cell-type';

export interface Column {
    title?: string;
    prop?: string;
    type?: CellType;
    link?: string;
    custom?: any;
    sorter?: string;
}
