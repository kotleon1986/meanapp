import {Component, OnInit, Input} from '@angular/core';
import { Column } from '../../../../../../interfaces/column';
import { CellType } from '../../../../../../constants/cell-type';
import StringHelper from '../../../../../../helpers/string.helper';
import TableHelper from '../../../../../../helpers/table.helper';


@Component({
  selector: 'app-data-table-cell',
  templateUrl: './data-table-cell.component.html',
  styleUrls: ['./data-table-cell.component.scss']
})
export class DataTableCellComponent implements OnInit {

  @Input('column') column: Column;
  @Input('row') row: any;

  cellTypes = CellType;

  constructor( ) { }

  ngOnInit() {
  }

  cell(row: any, column: Column): string {
    return TableHelper.cell(row, column);
  }

  camelCase(column: string): string {
    return StringHelper.camelCase(column);
  }

}
