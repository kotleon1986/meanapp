import { Column } from '../interfaces/column';
import StringHelper from './string.helper';

export default class TableHelper {

    public static cell(row: any, column: Column): string {
        let cell = '';
        if (column.custom) {
          cell = column.custom;
        } else if (column.prop) {
          if (column.prop.includes('.')) {
            const relation = column.prop.split('.');
            cell = row[relation[0]][relation[1]];
          } else {
            cell = row[column.prop];
          }
        } else {
          cell = row[StringHelper.camelCase(column.title)];
        }

        return cell;
    }

}
