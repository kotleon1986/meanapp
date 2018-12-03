import { DataTableSettings } from './data-table-settings';

export interface DataTable {
    tableSettings?: DataTableSettings;
    removeRow?: Function;
}
