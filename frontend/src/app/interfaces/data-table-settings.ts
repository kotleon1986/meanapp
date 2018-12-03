import { Subject } from 'rxjs';
import { Column } from './column';
import { Filter } from './filter';

export interface DataTableSettings {
    columns: Column[];
    endpoint: string;
    callback?: Function;
    filters?: Filter[];
    bulkSelect?: boolean;
    removeEndpoint?: string;
    disableActions?: boolean;
    disableAddButton?: boolean;
    disableExporting?: boolean;
    disableRowClick?: boolean;
    triggerRender?: Subject<null>;
}
